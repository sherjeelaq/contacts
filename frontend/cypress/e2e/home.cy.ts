export {}

describe('Application', () => {
  it('creates a contact', () => {
    const name = 'John Doe'
    const phone = '1234567890'
    const email = 'john.doe@example.com'

    // Visit the homepage
    cy.visit('/')
    cy.get('[data-testid=add-contact-modal-button]').click()
    cy.get('[data-testid=name-input]').type(name)
    cy.get('[data-testid=phone-input]').type(phone)
    cy.get('[data-testid=email-input]').type(email)
    cy.get('[data-testid=add-file-input]')
      .invoke('removeAttr', 'style') //makes element easier to interact with/accessible. Headless test fails wihout this.
      .selectFile('./public/assets/test/male-avatar.png', {
        force: true
      })
    cy.get('[data-testid=add-contact-button]').click()
    cy.get('[data-testid=contact-single]')
      .last()
      .should('include.text', name)
    cy.get('[data-testid=contact-single]')
      .last()
      .should('include.text', phone)
  })

  it('edit contact', () => {
    const name = 'Jane Doe'
    const phone = '0987654321'
    const email = 'jane.doe@example.com'

    // Visit the homepage
    cy.visit('/')
    cy.get('[data-testid=contact-single]')
      .get('[data-testid=contact-single-more]')
      .last()
      .click({ force: true })

    cy.get('[data-testid=edit-contact-option]').click()

    cy.get('[data-testid=edit-name-input]')
      .clear()
      .should('have.value', '')
      .type(name)
    cy.get('[data-testid=edit-phone-input]')
      .clear()
      .should('have.value', '')
      .type(phone)
    cy.get('[data-testid=edit-email-input]')
      .clear()
      .should('have.value', '')
      .type(email)

    cy.get('[data-testid=edit-clear-photo]').click()

    cy.get('[data-testid=edit-file-input]')
      .invoke('removeAttr', 'style') //makes element easier to interact with/accessible. Headless test fails wihout this.
      .selectFile('./public/assets/test/female-avatar.png', {
        force: true
      })
    cy.get('[data-testid=edit-contact-button]').click()
    cy.get('[data-testid=contact-single]')
      .last()
      .should('include.text', name)
    cy.get('[data-testid=contact-single]')
      .last()
      .should('include.text', phone)
  })

  it('delete contact', () => {
    cy.intercept('api/getContacts').as('getContacts')

    cy.visit('/')

    cy.get('[data-testid=contact-single]').then(($list) => {
      cy.wrap($list.length).then((length) => {
        const originalLength = length

        cy.get('[data-testid=contact-single]')
          .get('[data-testid=contact-single-more]')
          .last()
          .click({ force: true })

        cy.get('[data-testid=remove-contact-option]').click()
        cy.wait(2000)
        cy.wait('@getContacts')

        cy.get('[data-testid=contact-single]').then(($list) => {
          cy.wrap($list.length).then((updatedLength) => {
            cy.wrap(originalLength).should('not.eq', updatedLength)
          })
        })
      })
    })
  })
})
