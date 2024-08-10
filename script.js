
const allchekbox = document.querySelectorAll('.circle');
const userinput = document.querySelectorAll('.goalinput');
const progressbar = document.querySelector('.progressbar');
const progressvalue = document.querySelector('.progress-value');
const error = document.querySelector('.error-label');
const progresslebel = document.querySelector('.progress-lebel');
const p3= document.querySelector('.p-3');



const allquotes= [
    'Raise the bar by completing your goals!',
    'Well begun is half done!',
    'Just a step away, keep going!',
    'Whoa! You just completed all the goals, time for chill :D'
    
]




const myallgaols = JSON.parse(localStorage.getItem('myallgaols')) || {
   first:{
    names:'',
    completed: false

    },
   second:{
    names:'',
    completed: false

    },

   third:{
    names:'',
    completed: false

    },

}


let completedgoalcount = Object.values(myallgaols).filter((goal) => {
    return goal.completed;}).length;

progressvalue.style.width = `${completedgoalcount / 3 * 100}%`;
progressvalue.firstElementChild.innerText= `${completedgoalcount}/3 completed`
progresslebel.innerText= allquotes[completedgoalcount];

p3.innerText= " “Keep Going, You’re making great progress!” "





allchekbox.forEach((chekbox) => {

    chekbox.addEventListener('click', () => {
        let allfieldcheck = [...userinput].every((inputdata) => {
            return inputdata.value;
        })

        if (allfieldcheck) {
            chekbox.parentElement.classList.toggle('completed');

            const inputid = chekbox.nextElementSibling.id;

            myallgaols[inputid].completed = !myallgaols[inputid].completed;
            localStorage.setItem('myallgaols', JSON.stringify(myallgaols));
            completedgoalcount = Object.values(myallgaols).filter((goal) => {
                return goal.completed;}).length;


            progressvalue.style.width = `${completedgoalcount / 3 * 100}%`;

            progressvalue.firstElementChild.innerText= `${completedgoalcount}/3 completed`

            progresslebel.innerText= allquotes[completedgoalcount];
             p3.innerText= " “Keep Going, You’re making great progress!” "

        
        }

        else {
            progressbar.classList.add('showerror');
        }

    })
})




userinput.forEach((input) => {
    input.value = myallgaols[input.id].names
    if (myallgaols[input.id].completed) {
        input.parentElement.classList.add('completed');
    }

    input.addEventListener('focus', () => {
        progressbar.classList.remove('showerror');
    })
    
    input.addEventListener('input',(e)=>{
        if(myallgaols[input.id].completed){
            input.value= myallgaols[input.id].names
            return
        }

   
        myallgaols[e.target.id] = {
            names: e.target.value,
            completed: false

        }

        localStorage.setItem('myallgaols', JSON.stringify(myallgaols));
   })

})

