import { defineStore } from 'pinia'
import { getCrateDownloads } from '../utils/index'
import type { CrateInfo, DownloadData } from '../types/index'

interface StateInfo {
  search_value: string
  crates: string[]
  crateHashMap: Map<string, CrateInfo>
  mostDownloaded: CrateInfo[]
  cratesDownloadHashMap: Map<string, DownloadData[]>
}

export const useSearchStore = defineStore('searchStore', {
  state: (): StateInfo => {
    return {
      search_value: '',
      crates: [],
      crateHashMap: new Map<string, CrateInfo>(),
      cratesDownloadHashMap: new Map<string, DownloadData[]>(),
      mostDownloaded: [],
    }
  },
  persist: true,
  getters: {
    getSearchValue: state => state.search_value,
    getCrates: state => state.crates,
    getDownloadHashmap: state => (crate_name: string): DownloadData[] => {
      return state.crateHashMap[crate_name]
    },
    getCrateInfo: state => (crate_name: string): CrateInfo => {
      return state.crateHashMap[crate_name]
    },

  },
  actions: {
    updateSearchValue(value: string) {
      this.crates.push(value)
      this.search_value = value
    },
    removeCrate(index: number) {
      this.crates.splice(index, 1)
    },
    async mostDownloadedCrates() {
      try {
        const url = 'https://crates.io/api/v1/crates?page=1&per_page=50&sort=downloads'
        const response = await fetch(url, {
          headers: {
            'user-agent': 'rust-trends https://github.com/dxphilo/rust-trends',
          },
        })

        const data = await response.json()
        this.mostDownloaded = data.crates

        const store = useSearchStore()
        store.updateHashMap(data.crates)
      }
      catch (error) {
        console.error(error)
      }
    },
    updateHashMap(crates: CrateInfo[]) {
      for (let index = 0; index < crates.length; index++) {
        const element: CrateInfo = crates[index]
        this.crateHashMap[element.name] = element
      }
    },
    async crateDownloadInfo(crate: string) {
      try {
        const data = await getCrateDownloads(crate)
        this.cratesDownloadHashMap[crate] = data.version_downloads
      }
      catch (error) {
        // TODO: handle error
        // eslint-disable-next-line no-console
        console.log(error)
      }
    },
  },

})
