import { OfficialNBUCurs } from './interfaces';
const { div } = require("./utils");

let curses: OfficialNBUCurs[];


const getCourse = () => 
    fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
    .then((response) => response.json().then((data) => data as OfficialNBUCurs[]))


getCourse()
    .then((data) => {
        const app: any = document.getElementById('app');
        data.map((curs) => {

            const card = div({
                classNames: ['card'],
                children: [
                    div({
                        classNames: ['card__header'],
                        children: [curs.txt],
                    }),
                    div({
                        classNames: ['card__body'],
                        children: [curs.rate],
                    })
                ],
            });
            app.append(card);

        });

})



