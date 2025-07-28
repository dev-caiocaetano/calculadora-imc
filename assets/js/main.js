function calculoImc() {
    const formulario = document.querySelector('.form');
    const resultado = document.querySelector('.resultado');
    const explicacao = document.querySelector('.explicacao');

    const textoExplicacao = `
    <h3>
        O que é o IMC?
    </h3>
    <p>
        O cálculo do IMC (Índice de Massa Corporal) é uma forma simples de avaliar<br>
        se uma pessoa está com peso adequado em relação à sua altura.
    </p>
    <p>
        É uma medida rápida e útil, mas não leva em conta fatores como massa<br>
        muscular, distribuição de gordura ou condições específicas do indivíduo.
    </p>
    <h3>
        Como calcular:
    </h3>
    <p>
        <strong>
            IMC = peso (kg) ÷ (altura (m))²
        </strong>
    </p>
    <p>
        Ou seja, você divide o peso em quilos pela altura em metros ao quadrado.
    </p>
    <h3>
        O que os valores indicam:
    </h3>
    <p>
        <strong>Abaixo de 18,5:</strong> Abaixo do peso.<br> Pode indicar desnutrição ou necessidade de ganhar peso.<br>
        <strong>18,5 a 24,9:</strong> Peso normal.<br> Faixa considerada saudável.<br>
        <strong>25 a 29,9:</strong> Sobrepeso.<br> Pode indicar excesso de peso, mas sem obesidade.<br>
        <strong>30 a 34,9:</strong> Obesidade grau I.<br> Risco aumentado para doenças.<br>
        <strong>35 a 39,9:</strong> Obesidade grau II.<br> Risco mais elevado.<br>
        <strong>Acima de 40:</strong> Obesidade grau III (mórbida).<br> Risco muito alto para saúde.<br>
    </p>`;

    function recebeDados(evento) {
        evento.preventDefault();

        const nomeUsuario = formulario.querySelector('#input-nome').value.trim() || "Olá";
        const pesoEmQuilos = Number(formulario.querySelector('#input-peso').value);
        let alturaEmCentimetros = Number(formulario.querySelector('#input-altura').value);
        alturaEmCentimetros = alturaEmCentimetros / 100;
        const indiceMassaCorporal = (pesoEmQuilos / (alturaEmCentimetros ** 2)).toFixed(2);

        if ((isNaN(pesoEmQuilos) || pesoEmQuilos <= 0) && (isNaN(alturaEmCentimetros) || alturaEmCentimetros <= 0)) {
            resultado.innerHTML = `${nomeUsuario}, seu peso e altura são inválidos, revise os campos!`;
            return;
        }
        if (!alturaEmCentimetros || alturaEmCentimetros <= 0) {
            resultado.innerHTML = `${nomeUsuario}, sua altura é inválida, revise o campo!`;
            return;
        }
        if (!pesoEmQuilos || pesoEmQuilos <= 0) {
            resultado.innerHTML = `${nomeUsuario}, seu peso é inválido, revise o campo!`;
            return;
        }

        if (indiceMassaCorporal < 18.5) {
            resultado.innerHTML = `<strong>${nomeUsuario}, seu IMC é ${indiceMassaCorporal}.<br> Você está abaixo do peso ideal.`;
        } else if (indiceMassaCorporal < 25) {
            resultado.innerHTML = `<strong>${nomeUsuario}, seu IMC é ${indiceMassaCorporal}.<br><br> Você está no peso ideal.`;
        } else if (indiceMassaCorporal < 29.9) {
            resultado.innerHTML = `<strong>${nomeUsuario}, seu IMC é ${indiceMassaCorporal}.<br> Você está com sobrepeso.`;
        } else if (indiceMassaCorporal < 34.9) {
            resultado.innerHTML = `<strong>${nomeUsuario}, seu IMC é ${indiceMassaCorporal}.<br> Você está com Obesidade grau I.`;
        } else if (indiceMassaCorporal < 39.9) {
            resultado.innerHTML = `<strong>${nomeUsuario}, seu IMC é ${indiceMassaCorporal}.<br> Você está com Obesidade grau II.`;
        } else {
            resultado.innerHTML = `<strong>${nomeUsuario}, seu IMC é ${indiceMassaCorporal}.<br> Você está com Obesidade grau III (Mórbida).`;
        }

        explicacao.innerHTML = textoExplicacao;
    }

    formulario.addEventListener('submit', recebeDados);
}

calculoImc();
