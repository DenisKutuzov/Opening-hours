import {FC} from "react";
import './hoursData.scss'

interface HoursDataProps {
    dayOfWeek: string
    toDay: boolean
    dayClose: any
    dayTime : string
}

const HoursData: FC<HoursDataProps> = ({dayTime,dayClose, toDay, dayOfWeek}) => {

    return <div className={'hoursData'}>
        <div className={'hoursData__week'}>
            <p className={'hoursData__dayWeek'}>{dayOfWeek[0].toUpperCase() + dayOfWeek.slice(1)}</p>
            {toDay && <p className={'hoursData__dayNow'}>TODAY</p>}
        </div>
        {dayClose &&
            <p className={'hoursData__close'}>Closed</p>}
        {!dayClose &&
            <p className={'hoursData__time'}>{dayTime}</p>}
    </div>
}


export default HoursData