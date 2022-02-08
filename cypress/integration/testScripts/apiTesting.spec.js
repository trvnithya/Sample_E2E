/// <reference types = 'cypress' />
describe('Rest API Samples', () => {
    it('Handle Get Request', () => {
        cy.request('GET','https://reqres.in/api/users').as('userResp')
        cy.get('@userResp').its('status').should('equals',200)
    })
    it('Get User Data ', () => {
        cy.request('GET','https://reqres.in/api/users').then((response) =>{
            expect(response.body.data[5].email).equal('tracey.ramos@reqres.in')
            expect(response.headers.server).equal('cloudflare')
            //cy.log(response.body.data)
        })  
    })
    it('Create User', ()=>{
        var userRec = {
            id: 7,
            email: 'testuser1@test.com',
            first_name: 'Test',
            last_name: 'User1',
            avatar: 'https://reqres.in/img/faces/7-image.jpgt'
        }
    //Method 1 using Then
    cy.request('POST','https://reqres.in/api/users', userRec).then((response) =>{
        expect(response.status).equal(201)
        expect(response.body.id).equal(7)
        expect(response.body.email).equal('testuser1@test.com')
        expect(response.body.first_name).equal('Test')
        expect(response.body.last_name).equal('User1')
        expect(response.body.avatar).equal('https://reqres.in/img/faces/7-image.jpgt')
    })
    // cy.request('GET','https://reqres.in/api/users').then((response) =>{
    //     expect(response.body.data.length).equal(7)
    // })
    //  //Method 2 using immediate respsonse
    //  cy.request('POST','https://reqres.in/api/users', userRec)
    //     .its('body')
    //     .should('include', {name:'TestUser'})

    })
    it('Update User', ()=>{
        var userRec1 = {
            id: 8,
            email: 'testuser2@test.com',
            first_name: 'Test',
            last_name: 'User2',
            avatar: 'https://reqres.in/img/faces/8-image.jpgt'
        }
    cy.request('PUT','https://reqres.in/api/users/2', userRec1).then((response) =>{
        expect(response.status).equal(200)
        expect(response.body.id).equal(8)
        expect(response.body.email).equal('testuser2@test.com')
        expect(response.body.first_name).equal('Test')
        expect(response.body.last_name).equal('User2')
        expect(response.body.avatar).equal('https://reqres.in/img/faces/8-image.jpgt')
        })
    })
    it('Delete User', ()=>{
        cy.request('DELETE','https://reqres.in/api/users/2').then((response) =>{
            expect(response.status).equal(204)
        })
        
    })
})