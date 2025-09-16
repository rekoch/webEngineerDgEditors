function handleUserIdChange() {
    const userIdReadonly = document.getElementById('userIdReadonly');
    const userIdSet = document.getElementById('userIdSet');
    const newUserIdInput = document.getElementById('new-user-id');
    const dataUserId = document.getElementById('data-user-id');

    userIdReadonly.addEventListener('click', function() {
        userIdReadonly.classList.add('invisible');
        userIdSet.classList.remove('invisible');
    });

    let saveTimeout;
    newUserIdInput.addEventListener('input', function(e) {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(function() {
            const newUserId = newUserIdInput.value;
            dataUserId.textContent = newUserId;
            userIdReadonly.classList.remove('invisible');
            userIdSet.classList.add('invisible');
        }, 3000); // waits 3 seconds after user stops typing
    });

    newUserIdInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            clearTimeout(saveTimeout);
            const newUserId = newUserIdInput.value;
            dataUserId.textContent = newUserId;
            userIdReadonly.classList.remove('invisible');
            userIdSet.classList.add('invisible');
        }
    });
}

handleUserIdChange();
