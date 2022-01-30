let loader = document.querySelector('.loader');

const becomeSellerElement = document.querySelector('.become-seller');
const applyForm = document.querySelector('.apply-form');
const showApplyFormBtn = document.querySelector('#apply-btn');

window.onload = () => {
    if (sessionStorage.user) {
        let user = JSON.parse(sessionStorage.user);
        if (compareToken(user.authToken, user.email)) {
            becomeSellerElement.classList.remove('hide');
        } else {
            location.replace('/login');
        }
    } else {
        location.replace('/login');
    }
}

// gửi biểu mẫu
showApplyFormBtn.addEventListener('click', () => {
    becomeSellerElement.classList.add('hide');
    applyForm.classList.remove('hide');
})

//submission
const applyFormButton = document.querySelector('#apply-form-btn');
const businessName = document.querySelector('#business-name');
const address = document.querySelector('#business-add');
const about = document.querySelector('#about');
const number = document.querySelector('#number');
const tac = document.querySelector('#terms-and-conditions');
const legitInfo = document.querySelector('#legitInfo');

applyFormButton.addEventListener('click', () => {
    if (!businessName.value.length || !address.value.length || !about.value.length || !number.value.length) {
        showAlert('fill all thẻ inputs');
    } else if (!tac.checked || !legitInfo.checked) {
        showAlert('You must agree to our terms conditions');
    } else {
        //server request
        loader.style.display = 'block';
        sendData('/seller', {
            name: businessName.value,
            address: address.value,
            about: about.value,
            number: number.value,
            tac: tac.checked,
            legit: legit.checked,
            email: JSON.parse(sessionStorage.user).email
        })
    }
})