#! /usr/bin/env node

import inquirer from "inquirer";
import chalk, { Chalk } from "chalk";
import {differenceInSeconds, lastDayOfMonth} from "date-fns"

console.log(chalk.bold.blue("\n\tWELCOME TO THE COUNTDOWN TIMER\t\n"));

const res = await inquirer.prompt(
    [
        {
            name: "userInput",
            type: "number",
            message: "Please enter the amount of seconds",
            validate: (input)=>{
                if(isNaN(input)){
                    return chalk.red("Please enter a valid number")
                }else if (input > 60){
                    return chalk.red("seconds must be in 60")
                } else {
                    return true;
                }
            }
        }
    ]
);

let input = res.userInput

function startTime(val:number){
    const intTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(intTime);
    setInterval((()=>{
        const currTime = new Date()
        const timeDiff = differenceInSeconds(intervalTime, currTime);
        if(timeDiff <= 0){
            console.log("Time's up");
            process.exit()
        }
        const min = Math.floor((timeDiff%(3600*24))/3600)
        const sec = Math.floor(timeDiff%60)
        console.log(`${min.toString().padStart(2,"0")}:${sec.toString().padStart(2,"0")}`);
    }),1000)
}
startTime(input)
