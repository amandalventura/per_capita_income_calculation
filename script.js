const button = document.querySelector("#button");

button.addEventListener("click", async () => {
    const name = document.querySelector("#nome").value;
    const zip = document.querySelector("#cep").value;
    const monthly_income = document.querySelector("#renda").value;
    const number_of_dependents = document.querySelector("#dependentes").value;

    const response = await fetch("http://localhost:3333/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, zip, monthly_income, number_of_dependents })
    });

    const data = await response.json();

    const messageContainer = document.querySelector("#message-container");
    messageContainer.innerHTML = "";

    if (data.name) {
        const nameMessage = document.createElement("p");
        nameMessage.textContent = `Nome do titular: ${data.name}`;
        messageContainer.appendChild(nameMessage);
    }

    if (data.address) {
        const addressMessage = document.createElement("p");
        addressMessage.textContent = `Endereço completo: ${data.address.logradouro}, ${data.address.bairro}, ${data.address.localidade} - ${data.address.uf}`;
        messageContainer.appendChild(addressMessage);
    }

    if (data.candidates) {
        const incomeMessage = document.createElement("p");
        incomeMessage.textContent = `Valor da renda per capita: R$ ${data.candidates}`;
        messageContainer.appendChild(incomeMessage);
    }
});
