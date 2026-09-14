export enum Moment {
    MORNING = 'morning',
    NOON = 'noon',
    EVENING = 'evening',
    NIGHT = 'night',
}

export function momentLabel(moment: Moment): string {
    switch (moment) {
        case Moment.MORNING:
            return 'Matin';
        case Moment.NOON:
            return 'Midi';
        case Moment.EVENING:
            return 'Soir';
        case Moment.NIGHT:
            return 'Nuit';
    }
}