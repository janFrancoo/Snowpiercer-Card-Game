import text from "../config/text"

export default function convertYear(language, days) {
    const dayText = text[language].bottomNav.day
    const yearText = text[language].bottomNav.year

    if (days < 365)
        return dayText + " " + days
    else return yearText + " " + Math.floor(days / 365) + " " + dayText + " " + days % 365
}
