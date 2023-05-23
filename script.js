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

    openModal(data)

});

const close = document.querySelector("#close");
function openModal(data) {
    const modal = document.querySelector("#message-container")
    modal.classList.toggle("open")

    if (modal.classList.contains("open")) {
        const resultName = document.querySelector("#resultName")
        resultName.innerHTML = data.name;

        const resultRua = document.querySelector("#resultRua")
        resultRua.innerHTML = data.address.logradouro;

        const resultBairro = document.querySelector("#resultBairro")
        resultBairro.innerHTML = data.address.bairro;

        const resultCEP = document.querySelector("#resultCEP")
        resultCEP.innerHTML = data.address.cep;

        const resultMunicípio = document.querySelector("#resultMunicípio")
        resultMunicípio.innerHTML = data.address.localidade;

        const resultUf = document.querySelector("#resultUf")
        resultUf.innerHTML = data.address.uf;

        const resultPerCapitaIncome = document.querySelector("#resultPerCapitaIncome")
        resultPerCapitaIncome.innerHTML = data.candidates;
    }
}

close.addEventListener("click", () => {
    openModal();
});
