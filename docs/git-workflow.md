# Fluxo Git sugerido

## Branches

- `main`: versão estável.
- `develop`: integração opcional.
- `feature/week-XX`: novas semanas.
- `docs/nome-da-alteracao`: documentação.
- `fix/nome-da-correcao`: correções.

## Fluxo simples

```bash
git checkout -b feature/week-05
# editar arquivos
git add .
git commit -m "feat: adiciona atividades da semana 05"
git push -u origin feature/week-05
```

Depois, abrir Pull Request para `main`.
