var shell = require('shelljs');

let pdffile ="20-05-2020-attestation-de-deplacement-international-derogatoire-provenance-europe-fr.pdf";

describe("Telechargement fichier PDF et controle nombre de pages", async () => {
    before (function () {

        shell.chmod(755, '/Users/nicolasaugereau/Downloads/ci/toto/*')

    })

    after (function () {

    })

    it("Acces au site web", () => {
        cy.visit('https://www.interieur.gouv.fr/Actualites/L-actu-du-Ministere/Attestation-de-deplacement-et-de-voyage')
        cy.get(':nth-child(42) > [style="float:left; margin-top:30px; margin-right:70px; clear:left;"] > a > #eZObject_121883')
        .should('be.visible')
        //.click()
        .then((anchor) => {
            const url = anchor.attr('href')
            cy.log(url)
            cy.request(url).then()
        })
        /*
        .readFile(pdffile)
        .then((anchor) => {
            new Cypress.Promise((resolve, reject) => {
                const xhr = new HMLHttpRequest();
                xhr.optn('GET', anchor.prop('href'), true);
                xhr.responseType = 'blob';
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        const blob = xhr.response;
                        const reader = new FileReader();
                        reader.onload = () => {
                            resolve(reader.result)
                        }
                        reader.readAsText(blob)
                    }
                };
                xhr.send();
            })
        })
        */
    })
    it("Controle nombre de pages", () => {
        cy.task('getPdfNumpages', pdffile)
        .should('equal', 2)
    })
})