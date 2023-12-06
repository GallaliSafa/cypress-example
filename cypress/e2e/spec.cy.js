describe('template spec', () => {
  const baseUrl = Cypress.env('baseUrl')
 

  it('should login with an existing account', () => {
     cy.login('Gallali@test.fr', '987654321')

   //nous sommes rediriges sur la page d'accueil : le login a fonctionnée
    cy.url().should('be.oneOf', [baseUrl, baseUrl + '/'])
    cy.get('.header a[href="/account"]').click()
    cy.get('input[name="email"]').should( 'not.exist')
    cy.get('input[name="password"]').should( 'not.exist')
    cy.get('.account-details').should('contain','Gallali@test.fr')
  })
  it('should have a link to go to login page on the home page', () => { 
    // Demander à Cypress de se rendre sur une page web
    cy.visit(baseUrl)
    // Cibler l'élément "lien" (<a>) qui est contenu dans une balise qui a la classe ".header"
    cy.get('.header a[href="/account/login"]').click()
    cy.get('input[name="email"]').should('exist')
    cy.get('input[name="password"]').should('exist')
  })
  
  it('should have a link to go to login page on the home page then have email and password to connect', () => { 
    // Demander à Cypress de se rendre sur une page web
    cy.visit(baseUrl + '/account/login')
    //tester lemail et le password empty
    
    // act : click sur signin
    cy.get('button[type="submit"]').click()

    // assert
    cy.get('input[name="email"]').should('be.empty');expect([]).to.be.empty
    cy.get('input[name="password"]').should('be.empty');expect([]).to.be.empty



  })
  it('should be able to logout', () => { 
    // Demander à Cypress de se rendre sur une page web
    cy.login('Gallali@test.fr', '987654321')

    cy.visit(baseUrl + '/account')
    //demander de se deconnecter
    cy.contains('Logout').click()

  })
  it('should be not connect if mail is wrong', () => { 
    // Demander à Cypress de se rendre sur une page web
    cy.visit(baseUrl + '/account/login')
    cy.get('input[name="email"]').type( 'sousou@gmail.com')
    cy.get('input[name="password"]').type( '987654321')
    cy.get('button[type="submit"]').click()
    cy.contains('Invalid email or password')

  })
  it('should be not connect if password is wrong', () => { 
    // Demander à Cypress de se rendre sur une page web
    cy.visit(baseUrl + '/account/login')
    cy.get('input[name="email"]').type( 'Gallali@test.fr')
    cy.get('input[name="password"]').type( '123456')
    cy.get('button[type="submit"]').click()
    cy.contains('Invalid email or password')

  })
})
