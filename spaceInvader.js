document.addEventListener('DOMContentLoaded', () => {
    const width = 15
    const grid = document.querySelector('.grid')
    const scoreDisplay = document.querySelector('.score')
    let direction = 1
    let goingRight = true
    let alienRemoved = []
    for (let i = 0; i < 225; i++) {

        const squaer = document.createElement('div')
        grid.appendChild(squaer)

        console.log(squaer)
    }
    const squaers = Array.from(document.querySelectorAll('.grid div'))


    const alienInvaders = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]

    function draw() {
        for (let i = 0; i < alienInvaders.length; i++) {
            if (!alienRemoved.includes(i)) {
                squaers[alienInvaders[i]].classList.add('invader')
            }
        }
    }
    function remove() {
        for (let i = 0; i < alienInvaders.length; i++) {
            squaers[alienInvaders[i]].classList.remove('invader')
        }
    }


    draw()
    function moveInvader() {
        const leftEdge = alienInvaders[0] % width === 0
        const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1
        remove()
        if (rightEdge && goingRight) {
            for (let i = 0; i < alienInvaders.length; i++) {
                alienInvaders[i] += width + 1
                direction = -1
                goingRight = false
            }
        }
        if (leftEdge && !goingRight) {
            for (let i = 0; i < alienInvaders.length; i++) {
                alienInvaders[i] += width - 1
                direction = 1
                goingRight = true
            }
        }


        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += direction

        }
        draw()
        if (squaers[shooterCurrentIndex].classList.contains('invader')) {
            document.removeEventListener('keydown', move)
            clearInterval(invaderId)
            scoreDisplay.innerHTML = 'GAME OVER'
        }
        for (let i = 0; i < alienInvaders.length; i++) {

            if (alienInvaders[i] > squaers.length) {
                document.removeEventListener('keydown', move)
                clearInterval(invaderId)
                scoreDisplay.innerHTML = 'GAME OVER'

            }
        }
        if (alienRemoved.length === alienInvaders.length) {
            scoreDisplay.innerHTML = 'YOU WON'
            document.removeEventListener('keydown', move)
            clearInterval(invaderId)
        }
    }



    let invaderId = setInterval(moveInvader, 2000)




    let shooterCurrentIndex = 202

    squaers[shooterCurrentIndex].classList.add('shooter')



    function move(e) {

        squaers[shooterCurrentIndex].classList.remove('shooter')
        switch (e.key) {
            case 'ArrowRight':
                if (shooterCurrentIndex % width < width - 1) {

                    shooterCurrentIndex += 1
                    console.log('right')
                }
                break
            case 'ArrowLeft':
                if ((shooterCurrentIndex) % width !== 0) {

                    shooterCurrentIndex -= 1
                    console.log('left')
                }
                break


        }
        squaers[shooterCurrentIndex].classList.add('shooter')

    }
    document.addEventListener('keydown', move)




    function shoot(e) {




        let leserCurrentIndex = shooterCurrentIndex
        function moveleser() {


            squaers[leserCurrentIndex].classList.remove('leser')
            leserCurrentIndex -= width
            squaers[leserCurrentIndex].classList.add('leser')

            if (squaers[leserCurrentIndex].classList.contains('invader') && squaers[leserCurrentIndex].classList.contains('leser')) {
                clearInterval(leserId)
                squaers[leserCurrentIndex].classList.remove('leser')
                squaers[leserCurrentIndex].classList.remove('invader')
                squaers[leserCurrentIndex].classList.add('boom')
                setTimeout(() => squaers[leserCurrentIndex].classList.remove('boom'), 300)

                

                const alienRemovel = alienInvaders.indexOf(leserCurrentIndex)
                alienRemoved.push(alienRemovel)

            }


        }
        switch (e.key) {


            case 'ArrowUp':
                leserId = setInterval(moveleser, 100)



        }




    }

    document.addEventListener('keyup', shoot)





















})


