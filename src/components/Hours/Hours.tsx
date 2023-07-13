import HoursData from "../HoursData/HoursData";

import {AiOutlineClockCircle} from 'react-icons/ai'

import './hours.scss'


interface ScheduleData {
    [key: string]: Array<{ type: string; value: number }> | [];
}


const Hours = ({data}: { data: ScheduleData }) => {


    const daysOfWeek = Object.keys(data)

    function getCurrentDayOfWeek() {
        const today = new Date()
        return daysOfWeek[today.getDay() - 1]
    }


    function getDayClose(item: string) {
        return data[item].length === 0
    }


    function formatTime(time: number): string {
        const hours = Math.floor(time / 3600)
        const minutes = Math.floor((time - hours * 3600) / 60)
        const ampm = hours >= 12 ? 'PM' : 'AM'
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
        if (formattedMinutes === '00') {
            return `${formattedHours} ${ampm}`
        }
        return `${formattedHours}:${formattedMinutes} ${ampm}`
    }


    const timeWorks = (day: string, index: number) => {
        const dayTimeArr = data[day]
        const nextDay = daysOfWeek[index + 1]
        if (dayTimeArr.length === 0) {
            return ''
        }

        const openingHoursArr = dayTimeArr.filter((item: { type: string; }) => item.type === 'open')
        const closingHoursArr = dayTimeArr.filter((item: { type: string; }) => item.type === 'close')

        const openingHours = formatTime(openingHoursArr[0].value)
        const closingHours = closingHoursArr.length > 0 ? formatTime(closingHoursArr[0].value) : ''


        if (openingHoursArr.length > 1) {
            const openingHoursOne = formatTime(openingHoursArr[0].value)
            const openingHoursTwo = formatTime(openingHoursArr[0].value)

            if (closingHoursArr.length === 0) {
                const closingHoursItem = data[nextDay].find((item) => item.type === 'close')
                const closingHours = formatTime(closingHoursItem!.value)
                return `${openingHoursOne} - ${closingHours}, ${openingHoursTwo} - ${closingHours}`
            }

            if (closingHoursArr.length > 1) {
                const closingHours = formatTime(closingHoursArr[1].value)
                return `${openingHoursOne} - ${closingHours}, ${openingHoursTwo} - ${closingHours}`
            }

            return `${openingHoursOne} - ${closingHours}, ${openingHoursTwo} - ${closingHours}`
        }

        if (closingHoursArr.length === 0) {
            const closingHoursItem = data[nextDay].find((item) => item.type === "close")
            const closingHours = formatTime(closingHoursItem!.value)
            return `${openingHours} - ${closingHours}`
        }

        if (closingHoursArr.length > 1) {
            const closingHours = formatTime(closingHoursArr[1].value)
            return `${openingHours} - ${closingHours}`
        }

        return `${openingHours} - ${closingHours}`
    };


    return (
        <>
            <div className='hours'>
                <div className='hours__title'>
                    <AiOutlineClockCircle fill={'#A1A2A4'} size={25}/>
                    <p className='hours__text'>
                        Opening hours
                    </p>
                </div>
                <>
                    {daysOfWeek.map((item: string, index) =>
                        <div key={index}>
                            <HoursData dayTime={timeWorks(item, index)} dayClose={getDayClose(item)} dayOfWeek={item}
                                       toDay={getCurrentDayOfWeek() === item}/>
                        </div>
                    )}
                </>
            </div>
        </>
    )
}

export default Hours
