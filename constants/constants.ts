interface Words {
  [key: string]: {
    cancel: string
    save: string
    RU: string
    EN: string
    hours: string
    days: string
    cityName: string
  }
}


export const words: Words = {
    ru: {
        save: 'Сохранить',
        cancel: 'Отмена',
        RU: 'Русский',
        EN: 'Английский',
        hours: 'По часам',
        days: 'По дням',
        cityName: 'Введите название города:',
    },
    en: {
        save: 'Save',
        cancel: 'Cancel',
        EN: 'English',
        RU: 'Russian',
        hours: 'Hours',
        days: 'Days',
        cityName: 'Enter city name:',
    },
};