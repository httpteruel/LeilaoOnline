package com.leilaoonline.leilao.controller;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leilaoonline.leilao.dto.LoginDTO;
import com.leilaoonline.leilao.model.PasswordResetToken;
import com.leilaoonline.leilao.model.Pessoa;
import com.leilaoonline.leilao.repository.PasswordResetTokenRepository;
import com.leilaoonline.leilao.repository.PessoaRepository;
import com.leilaoonline.leilao.security.AuthenticationResponse;
import com.leilaoonline.leilao.security.JwtUtil;
import com.leilaoonline.leilao.security.UserDetailsServiceImpl;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PessoaRepository pessoaRepository;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody LoginDTO loginDTO) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getSenha())
            );
        } catch (BadCredentialsException e) {
            throw new Exception("Email ou senha incorretos", e);
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(loginDTO.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }

    @PostMapping("/recuperar-senha")
    public ResponseEntity<?> recuperarSenha(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        Pessoa pessoa = pessoaRepository.findByEmail(email);

        if (pessoa == null) {
            return ResponseEntity.ok("Se o email estiver cadastrado, um link de recuperação será enviado.");
        }

        PasswordResetToken existingToken = passwordResetTokenRepository.findByPessoa(pessoa);
        if (existingToken != null) {
            passwordResetTokenRepository.delete(existingToken);
        }

        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setPessoa(pessoa);

        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(Calendar.HOUR_OF_DAY, 24);
        resetToken.setExpiryDate(cal.getTime());

        passwordResetTokenRepository.save(resetToken);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Um token de recuperação foi criado.");
        response.put("token", token);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/alterar-senha")
    public ResponseEntity<?> alterarSenha(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String novaSenha = request.get("novaSenha");

        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token);

        if (resetToken == null) {
            return ResponseEntity.badRequest().body("Token de recuperação inválido.");
        }

        if (resetToken.getExpiryDate().before(new Date())) {
            passwordResetTokenRepository.delete(resetToken);
            return ResponseEntity.badRequest().body("Token de recuperação expirado. Por favor, solicite um novo.");
        }

        Pessoa pessoa = resetToken.getPessoa();
        pessoa.setSenha(passwordEncoder.encode(novaSenha));
        pessoaRepository.save(pessoa);

        passwordResetTokenRepository.delete(resetToken);

        return ResponseEntity.ok("Senha alterada com sucesso!");
    }
}