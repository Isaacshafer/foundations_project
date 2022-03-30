



function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector('.form__message')

    messageElement.textContent = message
    messageElement.classList.remove('form__message--success', 'form__message--error')
    messageElement.classList.add(`form__message--${type}`)
}

function setInputError(inputElement, message) {
    inputElement.classList.add('form__input--error')
    inputElement.parentElement.querySelector('.form__input-error-message').textContent = message
}

function clearInputError (inputElement) {
    inputElement.classList.remove('form__input--error')
    inputElement.parentElement.querySelector('.form__input-error-message').textContent = ''

}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#login')
    const createAccountForm = document.querySelector('#createAccount')
    
    document.querySelector('#linkCreateAccount').addEventListener('click', e => {
        e.preventDefault()
        loginForm.classList.add('form--hidden')
        createAccountForm.classList.remove('form--hidden')
    })
    document.querySelector('#linkLogin').addEventListener('click', e => {
        e.preventDefault()
        loginForm.classList.remove('form--hidden')
        createAccountForm.classList.add('form--hidden')
    })

    // loginForm.addEventListener('submit', e => {
    //     e.preventDefault()
    //     // login functionality
    //     setFormMessage(loginForm, "error", "Invalid username/password combination")
    // })

    

    document.querySelectorAll('.form__input').forEach(inputElement => {
        inputElement.addEventListener('blur', e => {
            if (e.target.id === 'signupUsername' && e.target.value.length > 0 && e.target.value.length < 4) {
                setInputError(inputElement, "Username must be at least 6 characters in length")
            }
        })
        inputElement.addEventListener('input', e => {
            clearInputError(inputElement)
        })
    })
})
const loginForm = document.querySelector('#login')
const createAccountForm = document.getElementById('createAccount')


createAccountForm.addEventListener('submit', (e) => {
        e.preventDefault()
        let username = document.getElementById('signupUsername')
        let password1 = document.getElementById('signupPassword1')
        let password2 = document.getElementById('signupPassword2')
        if(password1.value !== password2.value){
            setInputError(password1, 'Passwords must match')
            createAccountForm.addEventListener('input', () => {
                clearInputError(createAccountForm)
            })
            }
            else
            {

                let bodyObj = {
                username: username.value,
                 password1: password1.value
               }
                
                axios.post('/register', bodyObj)
                .then(res => {
                    if(res.status === 200){
                    console.log(res.data)
                    createAccountForm.classList.add('form--hidden')
                    loginForm.classList.remove('form--hidden')
                    setFormMessage(loginForm, 'success', 'Account registered!')
                }else if(res.status === 201){
                    setFormMessage(createAccountForm, 'error', 'Username unavailable')
                }
                })
            }
    })
loginForm.addEventListener('submit', e => {
    e.preventDefault()
    let username = document.getElementById('loginUsername')
    let password = document.getElementById('loginPassword')
    let bodyObj = {
        username: username.value,
        password: password.value
    }
    axios.post('/login', bodyObj)
    .then(res => {
        console.log(res.data)
        if(res.status === 200){
            location.assign('./game.html')
        }else if(res.status === 400){
            setFormMessage(loginForm, 'error', 'Incorrect username/password')
        }
    })
})







