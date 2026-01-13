const CardSkelton = () => {
  return (
    <div
      className="min-w-[120px] sm:min-w-[160px] md:min-w-[250px]
      max-w-[120px] sm:max-w-[160px] md:max-w-[250px]
      h-[200px] sm:h-[240px] md:h-[360px]
      rounded-xl bg-neutral-800 animate-pulse"
    >
      <div className="h-full w-full bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800" />
    </div>
  )
}

export default CardSkelton
