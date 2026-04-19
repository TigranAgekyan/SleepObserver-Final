const BPM_AWAKE = 60;
const BPM_SLEEP = 50;
const BPM_DEEP_SLEEP = 40;
const BPM_REM_SLEEP = 55;

function getCalculations(accelerationData, bpmData, thermometerData, microphoneData, timeStamps){
    //Check how many times the person woke up duing the night
    const checkIfWokeUp = () => {
        let count = 0;
        bpmData.forEach((data) =>{
            if(data >= BPM_AWAKE){
                count++;
            }
        });
        return count;
    }

    //Get the duration of sleep
    const getSleepDuration = () => {
        let startTime;
        let endTime = new Date(timeStamps[timeStamps.length - 1]);
        
        //Check when the person ACTUALLY fell asleep
        for(let i=0;i < bpmData.length;i++){
            if(!startTime && bpmData[i] < BPM_SLEEP){
                startTime = new Date(timeStamps[i]);
            }
        }
    
        const durationInMSec = endTime - startTime;
        const durationInSec = Math.floor(durationInMSec/1000);
        const durationInMin = Math.floor(durationInSec/60);
        const durationInHours = Math.floor(durationInMin/60);
    
        return {
            hours: durationInHours,
            minutes: durationInMin-durationInHours*60
        }
    }

    //Check if the microphone heard the person snore for more than half of their sleep duration
    const checkSnoring = () => {
        if(microphoneData.length >= timeStamps.length/2){
            return true;
        }
        return false;
    }

    const getAverageBPM = () => {
        const total = 0;
        bpmData.forEach((data) => {
            total + data;
        });

        return total/bpmData.length;
    }

    const checkMovement = () => {
        if(accelerationData.length >= timeStamps.length/2){
            return true;
        }
        return false;
    }

    const getSleepCycle = () => {
        let cycle = [];
        let cycleTimeStamps = [];
        let cycleTotals = {n1 : 0, n2: 0, n3: 0, rem: 0};
        bpmData.forEach((data, key) => {
            // console.log(`BPM : ${data}\nTEMP: ${thermometerData[key]}`);
            if(BPM_AWAKE >= data && data >= BPM_SLEEP){
                if(cycle[cycle.length - 1] == 'n3'){
                    cycle.push('rem');
                    cycleTimeStamps.push(timeStamps[key]);
                }else if(cycle[cycle.length - 1] != 'n1'){
                    cycle.push('n1');
                    cycleTimeStamps.push(timeStamps[key]);
                }else if(cycle[cycle.length - 1] != 'n2'){
                    cycle.push('n2');
                    cycleTimeStamps.push(timeStamps[key]);
                }
            }else if(BPM_SLEEP >= data && data >= BPM_DEEP_SLEEP){
                if(cycle[cycle.length - 1] != 'n3'){
                    cycle.push('n3');
                    cycleTimeStamps.push(timeStamps[key]);
                }
            }
        });

        for(let i=1; i < cycle.length; i++){
            let start = new Date(cycleTimeStamps[i-1]);
            let end = new Date(cycleTimeStamps[i]);
            let dur = ((end - start)/1000)/60/60; //Convert from milliseconds to hours
            if(cycle[i-1] == 'n1'){
                cycleTotals.n1 += dur;
            }else if(cycle[i-1] == 'n2'){
                cycleTotals.n2 += dur;
            }else if(cycle[i-1] == 'n3'){
                cycleTotals.n3 += dur;
            }else{
                cycleTotals.rem += dur;
            }
        }

        return {
            cycles: cycle,
            cycleTime: cycleTimeStamps,
            cycleTotals: cycleTotals
        };
    }

    //Get the sleep quality score, <score>/10
    const getSleepQuality = () => {

        let score = 10;
    
        //If the person woke up more than 2 time during the night, reduce score by 3. Otherwise reduce score by 1.
        if(checkIfWokeUp() <= 2){
            score--;
        }else{
            score -= 3;
        }

        //If the person was snoring, reduce the score by 1.
        if(checkSnoring()){
            score--;
        }

        if(getAverageBPM() > BPM_SLEEP){
            score -= 2;
        }

        if(checkMovement()){
            score -= 2;
        }

        return score;

    }
    
    return {
        duration: getSleepDuration(),
        sleepQuality: getSleepQuality(),
        cycleData: getSleepCycle(),
        bpm: bpmData,
        timeStamps: timeStamps
    }
}

module.exports = getCalculations;