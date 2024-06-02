
class Countdown {

    public hours: number = 0; 
    public minutes: number = 0;
    public seconds: number = 0;
    public days: number = 0;
    public isExpired: boolean = false;
    public timeRemaining: string = "";
    public timeZone: string = "Asia/Bangkok";
    public timeIso: Date = new Date();
    public timeDifference: number = 0;
    public timeInterval: any;

    // format string d,h,m,s 
    public _dFormat: string = "วัน"
    public _hFormat: string = "ชม."
    public _mFormat: string = "นาที"
    public _sFormat: string = "วินาที"
    public _expireWord: string = "หมดเวลาแล้ว"

    constructor(isoTime: Date) {
        this.timeIso = new Date(isoTime.toLocaleString('en-US', { timeZone: this.timeZone }));
    }

    public setTimeZone(timeZone: string) {
        this.timeZone = timeZone;
    }

    public getTimeZone() {
        return this.timeZone;
    }

    public calDifference() {
        const currentTime = new Date(new Date().toLocaleString('en-US', { timeZone: this.timeZone }));
        if(this.timeIso){
            this.timeDifference = this.timeIso.getTime() - currentTime.getTime();
            const totalSeconds = Math.floor(Math.abs(this.timeDifference) / 1000);
            this.days = Math.floor(totalSeconds / (3600 * 24));
            this.hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
            this.minutes = Math.floor((totalSeconds % 3600) / 60);
            this.seconds = totalSeconds % 60;
            this.isExpired = this.timeDifference < 0;
        }
    }

    public setFormatDisplay(d: string ,h: string ,m: string ,s: string ){
        this._dFormat = d;
        this._hFormat = h;
        this._mFormat = m;
        this._sFormat = s;
    }

    public setExpireWord(word: string){
        this._expireWord = word;
    }

    public getRemainingTime() {
        let timeRemaining = '';
        if (this.isExpired) {
            timeRemaining += this._expireWord;
        } else {
            if (this.days > 0) timeRemaining += `${this.days} ${this._dFormat} `;
            if (this.hours > 0) timeRemaining += `${this.hours} ${this._hFormat} `;
            if (this.minutes > 0) timeRemaining += `${this.minutes} ${this._mFormat} `;
            if (this.seconds > 0) timeRemaining += `${this.seconds} ${this._sFormat}`;
        }
        return timeRemaining.trim();
    }

    public getIsExpired(){
        return this.isExpired;
    }

    public start(callback: (time: string , isExpired: boolean) => void) {
        this.timeInterval = setInterval(() => {
            this.calDifference();
            callback(this.getRemainingTime() , this.getIsExpired());
        }, 1000);
    }

    public clear() {
        clearInterval(this.timeInterval);
        this.days = 0;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
    }
}

module.exports = Countdown;

// Example usage
// let time = new Countdown(new Date('2024-06-31T07:21:40.293Z'));
// time.setFormatDisplay("วัน" , "ชม." , "นาที" , "วินาที")
// time.setExpireWord("หมดเวลาแล้วนะ!!!")
// time.setTimeZone("Asia/Bangkok");
// time.start((remaining, isExpired) => {
//     console.log("Callback:::: ");
//     console.log("Time: ", remaining);
//     console.log("IsExpired: ", isExpired);
// });

