import { apply, curry } from 'ramda'
import { useEffect, useRef, useState } from 'react'

export const filterSkills = (skills: string[], term: string): string[] =>
  skills.filter(skill => skill.toLowerCase().match(term.toLowerCase()))

export const debounce = curry((immediate: boolean, fn: () => void, delay: number) => () => {
  let timeout: ReturnType<typeof setTimeout> | null

  return (...args: any[]) => {
    const later = () => {
      timeout = null

      if (!immediate) {
        apply(fn, args)
      }
    }

    const callNow = immediate && !timeout

    clearTimeout(timeout!)
    timeout = setTimeout(later, delay)

    if (callNow) {
      apply(fn, args)
    }

    return timeout
  }
})

// const timeoutIDRef = React.useRef()
// const onNISAction = React.useCallback(() => {
//   timeoutIDRef = React.useRef();
//   removeCurrentOverlay();
//   callback?.();
// }, [removeCurrentOverlay, callback]);
//
// // Wait until 1s idle
// if (isVisible) {
//   if (timeoutIDRef.current !== undefined) {
//     clearTimeout(timeoutIDRef.current)
//     timeoutIDRef.current = undefined
//   }
//   timeoutIDRef.current = setTimeout(() => addOverlay(() => (
//     …
//     <Button onPress={onNISAction} />
//     …
// ), 1000);
//
//   // Or always show after 1s
//   if (isVisible && timeoutIDRef.current === undefined) {
//     timeoutIDRef.current = setTimeout(() => addOverlay(() => (
//     …
//     <Button onPress={onNISAction} />
//     …
//   ), 1000);

export const useSkillsFilter = (skills: string[]) => {
  const oldTerm = useRef('')
  const [filteredSkills, setFilteredSkills] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isBusy, setBusy] = useState(false)

  useEffect(() => {
    console.log(searchTerm)
    if (searchTerm === '') {
      setFilteredSkills([])
    }
  }, [searchTerm])

  useEffect(() => {
    if (!isBusy && searchTerm !== '' && oldTerm.current !== searchTerm && skills.length > 0) {
      setBusy(true)
      oldTerm.current = searchTerm
      setTimeout(() => {
        console.log('hitting search')
        if (searchTerm !== '' && skills.length > 0) {
          const filtered = filterSkills(skills, searchTerm)
          setFilteredSkills(filtered)
        }
        setBusy(false)
      }, 300)
    }
  }, [isBusy, searchTerm, skills])

  return { filteredSkills, isBusy, searchTerm, setSearchTerm }
}
