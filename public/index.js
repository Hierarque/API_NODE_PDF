document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('characterForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        
        const characterData = {
            "character": {
                "name": form.querySelector('#charName').value,
                "race": form.querySelector('#charRace').value,
                "class": form.querySelector('#charClass').value,
                "background": form.querySelector('#charBackground').value,
                "strength": parseInt(form.querySelector('#strength').value),
                "dexterity": parseInt(form.querySelector('#dexterity').value),
                "intelligence": parseInt(form.querySelector('#intelligence').value),
                "wisdom": parseInt(form.querySelector('#wisdom').value),
                "charisma": parseInt(form.querySelector('#charisma').value)
            }
        };
        console.log(characterData)
        

        fetch(form.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(characterData)
        })
        .then(response => {
            if (response.ok) {
                return response.blob();
            }
            throw new Error('Network response was not ok.');
        })
        .then( blob => {
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = 'character_sheet.pdf';

            link.click();

            URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Error sending data to server:', error);
        });
    });
});
