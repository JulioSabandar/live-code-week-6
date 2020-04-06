$(document).ready(()=>{
    checkLogin();
    $('#loginForm').submit(e => {
        e.preventDefault();
        let email = $('#exampleInputEmail1').val()
        let password = $('#exampleInputPassword').val()
        $.ajax({
            url: 'http://localhost:5000/login',
            method: 'POST',
            data: {
                email: email,
                password: password
            }
        }).done(data=>{
            localStorage.setItem('access_token', data.access_token)
            checkLogin();
        }).fail()
    })
    $('#logoutButton').click(()=>{
        localStorage.setItem('access_token', '')
        checkLogin();
    })
    $('#addFoodForm').submit(e =>{
        e.preventDefault();
        let title = $('#title').val()
        let price = $('#price').val()
        let ingredients = $('#ingredients').val()
        let tag = $('#tag').val()
        console.log(title)
        console.log(price)

        $.ajax({
            url: 'http://localhost:5000/foods/',
            method: 'POST',
            data: {
                title,
                price,
                ingredients,
                tag
            }
        }).done(data=>{
            checkLogin();
        }).fail()
    })
})

function checkLogin(){
    console.log(localStorage.getItem('access_token'))
    if(localStorage.getItem('access_token') == 'undefined' || localStorage.getItem('access_token') == ''){
        $('#loginContainer').show();
        $('#appContainer').hide();
        $('#appContainer').hide();
    }else{
        $('#loginContainer').hide();
        $('#appContainer').show();

    }
}