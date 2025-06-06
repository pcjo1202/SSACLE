import { useSsaprint } from '@/contexts/SsaprintContext'

const DateInput = ({ label, value, setValue, min, max, disabled }) => {
  const { formatToDisplayDate, getTomorrowDate } = useSsaprint()

  return (
    <div className="relative w-[48%]">
      <label className="text-ssacle-black text-sm font-bold">{label}</label>
      <input
        type="date"
        className={`w-full bg-ssacle-gray-sm rounded-full p-3 cursor-pointer focus:outline-ssacle-blue transition-colors duration-200 ${
          value ? 'text-ssacle-blue' : 'text-ssacle-gray'
        }`}
        value={formatToDisplayDate(value)}
        onChange={(e) => setValue(e.target.value)}
        min={min}
        max={max}
        disabled={disabled}
        onKeyDown={(e) => e.preventDefault()}
      />
    </div>
  )
}

export default DateInput
