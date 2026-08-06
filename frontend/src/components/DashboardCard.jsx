function DashboardCard({
  title,
  count,
  icon,
  iconBg,
  iconColor,
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 flex items-center justify-between">

      {/* Left Side */}
      <div>
        <p className="text-gray-500 text-sm font-medium">
          {title}
        </p>

        <h2 className="text-4xl font-bold mt-3">
          {count}
        </h2>
      </div>

      {/* Right Side */}
      <div
        className={`${iconBg} w-18 h-18 rounded-2xl flex items-center justify-center`}
      >
        <div className={`${iconColor} text-4xl`}>
          {icon}
        </div>
      </div>

    </div>
  );
}

export default DashboardCard;