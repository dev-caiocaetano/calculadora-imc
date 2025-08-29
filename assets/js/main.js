function bmiCalculator() {
    const form = document.querySelector('.form');
    const result = document.querySelector('.resultado');
    const explanation = document.querySelector('.explicacao');

    const explanationText = `
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

    function receiveData(evento) {
        evento.preventDefault();

        const userName = form.querySelector('#input-nome').value.trim() || "Olá";
        const weight = Number(form.querySelector('#input-peso').value);
        let height = Number(form.querySelector('#input-altura').value);

        const validateMessage = (validateInputs(weight, height, userName));
    
        if (validateMessage) {
            result.innerHTML = validateMessage;
            return;
        }  

        const bmi = calculateBMI(weight, height);
        const levelBmi = classifyBmi(bmi);
        const message = resultMessage(userName, bmi, levelBmi);

        result.innerHTML = message;
        explanation.innerHTML = explanationText;
    }

    function validateInputs(weight, height, name) {
        if ((isNaN(weight) || weight <= 0) && (isNaN(height) || height <= 0)) {
            return `${name}, seu peso e altura são inválidos, revise os campos!`;
        };
        if (!height || height <= 0) {
            return `${name}, sua altura é inválida, revise o campo!`;
        };
        if (!weight || weight <= 0) {
            return `${name}, seu peso é inválido, revise o campo!`;
        };
    };

    function calculateBMI(weight, height) {
        const bodyMassIndex = (weight / ((height / 100) ** 2)).toFixed(2);
        return bodyMassIndex;
    };

    function classifyBmi(value) {
        const bmiLevels = [
            { level: 'Obesidade grau III (mórbida)', min: 40 },
            { level: 'Obesidade grau II', min: 35 },
            { level: 'Obesidade grau I', min: 30 },
            { level: 'Sobrepeso', min: 25 },
            { level: 'Peso normal', min: 18.5 },
            { level: 'Abaixo do peso', min: 0 }
        ];
        const foundBmi = bmiLevels.find((level) => level.min <= value);
        return foundBmi.level;
    };

    function resultMessage(name, bmi, level) {
        return `<strong>${name}, seu IMC é ${bmi} - ${level}`
    };

    form.addEventListener('submit', receiveData);
}

bmiCalculator();