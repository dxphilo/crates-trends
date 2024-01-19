import dayjs from 'dayjs'
import type { DownloadData, FilteredDownloads } from '@/types/index'

export function formatString(input: number): string {
  const reversedString = input
    .toString()
    .split('')
    .reduceRight((acc, digit, index) => {
      if (index !== 0 && index % 3 === 0)
        return `${acc + digit},`

      else
        return acc + digit
    }, '')

  return reversedString
}

export function formatDate(dateString: string): string {
  const originalDate = new Date(dateString)
  const options = { day: 'numeric', month: 'long', year: 'numeric' }
  const formattedDate = originalDate.toLocaleDateString('en-US', options)

  return formattedDate
}

export function getTimeAgo(timestamp: string): string {
  const currentDate = new Date()
  const createdAt = new Date(timestamp)

  const timeDifference = currentDate - createdAt
  const seconds = Math.floor(timeDifference / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0)
    return `${days} day${days > 1 ? 's' : ''} ago`

  else if (hours > 0)
    return `${hours} hour${hours > 1 ? 's' : ''} ago`

  else if (minutes > 0)
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`

  else
    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`
}

export function generateVsString(crates: string[]): string {
  if (crates.length === 0)
    return ''

  if (crates.length === 1)
    return `/${crates[0]}`

  const vsString = `${crates.slice(0, -1).join('-vs-')}-vs-${crates[crates.length - 1]}`
  return `/${vsString}`
}

export function parseVsString(vsString: string): string[] {
  return vsString.split('-vs-')
}

export async function getCrateDownloads(crate_name: string) {
  try {
    const apirUrl = `https://crates.io/api/v1/crates/${crate_name}/downloads`
    const response = await fetch(apirUrl, {
      headers: {
        'user-agent': 'rust-trends https://github.com/dxphilo/rust-trends',
      },
    })
    const data = await response.json()
    return data
  }
  catch (error) {
    throw new Error(error)
  }
}

export function filterDownloadsByDuration(downloads: DownloadData[], duration: string, crate: string) {
  const groupedData = groupDownloadsByPeriod(downloads, duration)
  const result = {
    label: crate,
    data: groupedData.downloads.map(d => d),
    dates: groupedData.dates.map(d => d),
    backgroundColor: getRandomColor(),
    borderColor: getRandomColor(),
    borderWidth: 3,
  }

  return result
}

interface CrateDownload {
  date: string
  download: number
  version: number
}

export function groupDownloadsByPeriod(dates: CrateDownload, period: 'week' | 'month' | 'year' = 'week') {
  const downloadsGroupedByPeriod = {}

  dates.forEach((date) => {
    const startOfPeriodDate = dayjs(date.date).startOf(period).format('YYYY-MM-DD')

    if (!downloadsGroupedByPeriod[startOfPeriodDate])
      downloadsGroupedByPeriod[startOfPeriodDate] = []

    downloadsGroupedByPeriod[startOfPeriodDate].push({
      date: dayjs(startOfPeriodDate).format('DD/MM/YYYY'),
      downloads: date.downloads,
    })
  })

  const resultDates = Object.values(downloadsGroupedByPeriod).map((periodData) => {
    return periodData[0].date
  })

  const resultDownloads = Object.values(downloadsGroupedByPeriod).map((periodData) => {
    const totalDownloads = periodData.reduce((acc, data) => acc + data.downloads, 0)
    return totalDownloads
  })

  return { dates: resultDates, downloads: resultDownloads }
}

export function getRandomColor(): string {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++)
    color += letters[Math.floor(Math.random() * 16)]

  return color
}
