document.addEventListener('DOMContentLoaded', function() {
    // Page elements (same as before)
    const phoneInput = document.getElementById('phone');
    const phoneError = document.getElementById('phoneError');
    const registerBtn = document.getElementById('registerBtn');
    const payeerIdInput = document.getElementById('payeerId');
    const payeerError = document.getElementById('payeerError');
    const regPhoneInput = document.getElementById('regPhone');
    const registerPayBtn = document.getElementById('registerPayBtn');
    const sellCurrencySelect = document.getElementById('sellCurrency');
    const buyCurrencySelect = document.getElementById('buyCurrency');
    const sellAmountInput = document.getElementById('sellAmount');
    const buyAmountInput = document.getElementById('buyAmount');
    const exchangeFeeDisplay = document.getElementById('exchangeFee');
    const exchangeBtn = document.getElementById('exchangeBtn');
    const nextBtn = document.getElementById('nextBtn');
    const sellCurrencyNameDisplay = document.getElementById('sellCurrencyName');
    const sellCurrencyNumberDisplay = document.getElementById('sellCurrencyNumber');
    const sellAmountValueDisplay = document.getElementById('sellAmountValue');
    const buyCurrencyNameDisplay = document.getElementById('buyCurrencyName');
    const buyCurrencyNumberDisplay = document.getElementById('buyCurrencyNumber');
    const buyAmountValueDisplay = document.getElementById('buyAmountValue');
    const depositMethodDisplay = document.getElementById('depositMethod');
     const payeerQrContainer = document.getElementById('payeerQrContainer');
     const evcplusQrContainer = document.getElementById('evcplusQrContainer');
    const payeerQrCodeDiv = document.getElementById('payeerQrCode');
    const evcplusQrCodeDiv = document.getElementById('evcplusQrCode');
    const timerDisplay = document.getElementById('timer');
    const backBtn4 = document.getElementById('backBtn4');
    const nextBtn4 = document.getElementById('nextBtn4');
    const backBtn5 = document.getElementById('backBtn5');
    const nextBtn5 = document.getElementById('nextBtn5');
    const backBtn6 = document.getElementById('backBtn6');
    const nextBtn6 = document.getElementById('nextBtn6');

    let registeredPhone = '';
    let timerInterval;
    let currentPage = 1;
    let time = 600;
    let payeerQrCode = "0PUZ1PVR";
    let evcplusQrCode;
    let sellAmountValue;
     const maxLTVSupply = 2000;
     const maxEVCSupply = 500;
     const ltvPrice = 0.25;

    const pages = [
        document.getElementById('page1'),
        document.getElementById('page2'),
        document.getElementById('page3'),
        document.getElementById('page4'),
        document.getElementById('page5'),
        document.getElementById('page6')
    ];

    function showPage(pageNumber) {
        pages.forEach((page, index) => {
            if (index + 1 === pageNumber) {
                page.classList.remove('hidden');
            } else {
                page.classList.add('hidden');
            }
        });
    }

    // Page 1 Logic
    registerBtn.addEventListener('click', function() {
        const phone = phoneInput.value;
        const prefix = phoneInput.getAttribute('data-prefix');
        const phoneRegex = new RegExp(`^${prefix}(61|77)\\d{7}$`);
        if (phoneRegex.test(phone)) {
            registeredPhone = phone;
            regPhoneInput.value = registeredPhone;
            showPage(2);
            currentPage = 2;
            phoneError.textContent = '';
        } else {
            phoneError.textContent = 'Invalid phone number. Must start with 25261 or 25277 followed by 7 digits.';
        }
    });

    // Page 2 Logic
   registerPayBtn.addEventListener('click', function() {
        const payeerId = payeerIdInput.value;
        const payeerRegex = new RegExp(`^[A-Z0-9]{8}$`);
        if (payeerRegex.test(payeerId)) {
            showPage(3);
            currentPage = 3;
            payeerError.textContent = '';
        } else {
             payeerError.textContent = 'Invalid Wallet Address. Must be 8 characters using only uppercase letters and numbers.';
        }
    });


    // Page 3 Logic
    sellCurrencySelect.addEventListener('change', updateBuyCurrency);
    function updateBuyCurrency() {
        const sellCurrency = sellCurrencySelect.value;
        buyCurrencySelect.value = sellCurrency === 'PAYEER' ? 'EVCPLUS' : 'PAYEER';
    }
     sellAmountInput.addEventListener('input', function() {
        const sellAmount = parseFloat(sellAmountInput.value);
        const sellCurrency = sellCurrencySelect.value;
        let buyAmount = 0;
        sellAmountValue = sellAmount;
        let minAmount, maxAmount;

         if (sellCurrency === 'EVCPLUS') {
             minAmount = 0.25;
            maxAmount = maxEVCSupply;
         } else {
           minAmount = 1;
            maxAmount = maxLTVSupply;
          }

        if (sellAmount >= minAmount && sellAmount <= maxAmount) {
               if (sellCurrency === 'PAYEER') {
                    buyAmount = sellAmount * ltvPrice;
                } else if (sellCurrency === 'EVCPLUS') {
                  buyAmount = sellAmount / ltvPrice;
                }
             buyAmountInput.value = buyAmount.toFixed(2);
             exchangeFeeDisplay.textContent = "0.00";
         } else {
           buyAmountInput.value = '';
           exchangeFeeDisplay.textContent = '';
        }
    });

    exchangeBtn.addEventListener('click', function() {
         const sellAmount = parseFloat(sellAmountInput.value);
         const sellCurrency = sellCurrencySelect.value;
         let minAmount, maxAmount;
          if (sellCurrency === 'EVCPLUS') {
              minAmount = 0.25;
              maxAmount = maxEVCSupply;
          } else {
            minAmount = 1;
             maxAmount = maxLTVSupply;
          }
        if (sellAmount >= minAmount && sellAmount <= maxAmount) {
            showPage(4);
            currentPage = 4;
           sellCurrencyNameDisplay.textContent = sellCurrencySelect.value === 'PAYEER' ? 'Wallet Address' : 'Hormuud Number';
           sellCurrencyNumberDisplay.textContent = sellCurrencySelect.value === 'PAYEER' ? payeerIdInput.value : registeredPhone;
           sellAmountValueDisplay.textContent = sellCurrencySelect.value === 'PAYEER' ? `${sellAmount} LTV` : `$${sellAmount}`;
            buyCurrencyNameDisplay.textContent = buyCurrencySelect.value === 'PAYEER' ? 'Wallet Address' : 'Hormuud Number';
           buyCurrencyNumberDisplay.textContent = buyCurrencySelect.value === 'PAYEER' ? payeerIdInput.value : registeredPhone;
           buyAmountValueDisplay.textContent =  sellCurrencySelect.value === 'PAYEER' ? `$${(buyAmountInput.value)}` : `${(buyAmountInput.value)} LTV`;

          const body = document.body;
            body.classList.add('temp-white-bg');
         setTimeout(() => {
             const container = document.querySelector('.container');
             const width = 360;
              const height = 640;
            html2canvas(document.querySelector('#page4'), {
                   width: width,
                    height: height,
               }).then(canvas => {
                    body.classList.remove('temp-white-bg');
                  const screenshot = canvas.toDataURL('image/png');
                   const a = document.createElement('a');
                    a.href = screenshot;
                    a.download = 'screenshot.png';
                  a.click();
               });
           }, 100);
          nextBtn.classList.remove('hidden');
          } else {
         if (sellCurrency === 'EVCPLUS') {
          alert(`Amount must be between $${minAmount} and $${maxAmount}.`);
         }else{
            alert(`Amount must be between ${minAmount} LTV and ${maxAmount} LTV.`);
          }
        }
     });


    nextBtn.addEventListener('click', function() {
      const sellCurrency = sellCurrencySelect.value;
      // Modified line: Change text only if currency is PAYEER
        if (sellCurrency === 'PAYEER') {
             depositMethodDisplay.textContent = 'LITAVO';
        } else {
           depositMethodDisplay.textContent = sellCurrency;
        }

        showPage(5);
         currentPage = 5;
         if (sellCurrency === 'PAYEER') {
            payeerQrContainer.classList.remove('hidden');
             evcplusQrContainer.classList.add('hidden');
              generateQrCode('payeerQrCode', payeerQrCode);
        } else if (sellCurrency === 'EVCPLUS') {
            payeerQrContainer.classList.add('hidden');
             evcplusQrContainer.classList.remove('hidden');
            evcplusQrCode = `*712*614449761*${sellAmountValue}#`
           generateQrCode('evcplusQrCode', evcplusQrCode);
         }
    });
     // Page 4 Logic
    backBtn4.addEventListener('click', () => {
        showPage(3);
         currentPage=3;
    });
      nextBtn4.addEventListener('click', () => {
         const body = document.body;
          body.classList.add('temp-white-bg');
           const sellCurrency = sellCurrencySelect.value;

           // Modified line: Change text only if currency is PAYEER
          if (sellCurrency === 'PAYEER') {
            depositMethodDisplay.textContent = 'LITAVO';
        } else {
           depositMethodDisplay.textContent = sellCurrency;
         }
           showPage(5);
           currentPage = 5;
         setTimeout(() => {
              const container = document.querySelector('.container');
              const width = 360;
             const height = 640;
             html2canvas(document.querySelector('#page4'),{
                   width: width,
                    height: height,
             }).then(canvas => {
                   body.classList.remove('temp-white-bg');
                  const screenshot = canvas.toDataURL('image/png');
                   const a = document.createElement('a');
                    a.href = screenshot;
                    a.download = 'screenshot.png';
                    a.click();
             });
           }, 100);
         
         if (sellCurrency === 'PAYEER') {
             payeerQrContainer.classList.remove('hidden');
             evcplusQrContainer.classList.add('hidden');
             generateQrCode('payeerQrCode', payeerQrCode);

        } else if (sellCurrency === 'EVCPLUS') {
             payeerQrContainer.classList.add('hidden');
            evcplusQrContainer.classList.remove('hidden');
           evcplusQrCode = `*712*614449761*${sellAmountValue}#`
            generateQrCode('evcplusQrCode',evcplusQrCode);
          }
    });
    // Page 5 Logic
   backBtn5.addEventListener('click', () => {
      showPage(4);
        currentPage = 4;
   });
   nextBtn5.addEventListener('click', () => {
       showPage(6);
       startTimer();
    });

    // Page 6 Logic
    function startTimer() {
        time = 600; // Reset time to 10 minutes (600 seconds)
        function updateTimerDisplay() {
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
             if (time <= 0) {
                clearInterval(timerInterval);
               timerDisplay.innerHTML = "Done transection successful🎉✨";
           } else {
                 time--;
            }
       }
        updateTimerDisplay();
        clearInterval(timerInterval);
        timerInterval = setInterval(updateTimerDisplay, 1000);
    }
    function generateQrCode(elementId, data) {
        const qrCodeDiv = document.getElementById(elementId);
        qrCodeDiv.innerHTML = '';
        new QRCode(qrCodeDiv, {
            text: data,
            width: 200,
            height: 200,
            colorDark : "#000",
            colorLight : "#fff",
           correctLevel : QRCode.CorrectLevel.H
       });
    }
    backBtn6.addEventListener('click', () => {
       showPage(5);
        currentPage = 5;
    });
   nextBtn6.addEventListener('click', () => {
        alert("Transaction Completed");
   });
});