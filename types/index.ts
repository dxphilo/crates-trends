export interface CrateInfo {
  [x: string]: any
  badges: string[]
  categories: null
  created_at: string
  description: string
  documentation: string
  downloads: number
  exact_match: boolean
  homepage: null
  id: string
  keywords: null
  links: {
    owner_team: string
    owner_user: string
    owners: string
    reverse_dependencies: string
    version_downloads: string
    // Add other properties as needed
  }
  max_stable_version: string
  max_version: string
  name: string
  newest_version: string
  recent_downloads: number
  repository: string
  updated_at: string
  versions: null
}

export interface DownloadData {
  date: string
  downloads: number
  version: number
}

export interface FilteredDownloads {
  dates: string[]
  downloads: number[]
}
