import { useTranslation } from 'react-i18next'
import { useBreakpointValue } from '../../../styles/breakpoints'
import { useMemo } from 'react'
import dayjs from 'dayjs'

export const useWeekDays = (selectedDate) => {
  const { t } = useTranslation()

  const Monday = useBreakpointValue({
    desktopValue: t('Monday').slice(0, 3),
    tabletValue: t('Monday').slice(0, 3),
    mobileValue: t('Monday').slice(0, 1),
  })
  const Tuesday = useBreakpointValue({
    desktopValue: t('Tuesday').slice(0, 3),
    tabletValue: t('Tuesday').slice(0, 3),
    mobileValue: t('Tuesday').slice(0, 1),
  })
  const Wednesday = useBreakpointValue({
    desktopValue: t('Wednesday').slice(0, 3),
    tabletValue: t('Wednesday').slice(0, 3),
    mobileValue: t('Wednesday').slice(0, 1),
  })
  const Thursday = useBreakpointValue({
    desktopValue: t('Thursday').slice(0, 3),
    tabletValue: t('Thursday').slice(0, 3),
    mobileValue: t('Thursday').slice(0, 1),
  })
  const Friday = useBreakpointValue({
    desktopValue: t('Friday').slice(0, 3),
    tabletValue: t('Friday').slice(0, 3),
    mobileValue: t('Friday').slice(0, 1),
  })
  const Saturday = useBreakpointValue({
    desktopValue: t('Saturday').slice(0, 3),
    tabletValue: t('Saturday').slice(0, 3),
    mobileValue: t('Saturday').slice(0, 1),
  })
  const Sunday = useBreakpointValue({
    desktopValue: t('Sunday').slice(0, 3),
    tabletValue: t('Sunday').slice(0, 3),
    mobileValue: t('Sunday').slice(0, 1),
  })

  const daysText = useMemo(
    () => [Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday],
    [Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday],
  )

  return useMemo(() => {
    let day = dayjs(selectedDate)

    if (day.day() === 0) day = day.subtract(1, 'day')

    const monday = day.day(1)

    const days = new Array(7).fill(null).map((_, i) => monday.clone().add(i, 'day').toDate())

    return days.map((date, i) => ({
      text: daysText[i],
      date,
    }))
  }, [selectedDate, daysText])
}
