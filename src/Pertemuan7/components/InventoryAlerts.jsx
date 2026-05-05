/**
 * InventoryAlerts Component
 * Menampilkan item inventori dengan peringatan status
 * Class Tailwind: bg-red-*, bg-yellow-*, border-l-*, text-*-900, text-*-700
 */
export default function InventoryAlerts() {
  const inventory = [
    {
      id: 1,
      name: 'Oat Milk',
      status: 'Critical',
      amount: '2 liters',
      percentage: '5%',
      color: 'red'
    },
    {
      id: 2,
      name: 'Colombian Beans',
      status: 'Low',
      amount: '5 kg',
      percentage: '20%',
      color: 'yellow'
    },
    {
      id: 3,
      name: 'Vanilla Syrup',
      status: 'Medium',
      amount: '3 bottles',
      percentage: '20%',
      color: 'yellow'
    },
    {
      id: 4,
      name: 'Paper Cups (Large)',
      status: 'Low',
      amount: '8 packs',
      percentage: '8%',
      color: 'yellow'
    },
    {
      id: 5,
      name: 'Whipped Cream',
      status: 'Critical',
      amount: '1 cans',
      percentage: '8%',
      color: 'red'
    }
  ];

  const getBgColor = (color) => {
    const colors = {
      red: 'bg-red-50 border-red-500',
      yellow: 'bg-yellow-50 border-yellow-500',
      green: 'bg-green-50 border-green-500'
    };
    return colors[color] || colors.yellow;
  };

  const getTextColor = (color) => {
    const colors = {
      red: 'text-red-900',
      yellow: 'text-yellow-900',
      green: 'text-green-900'
    };
    return colors[color] || colors.yellow;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">⚠️ Peringatan Inventori</h3>
        <span className="bg-red-100 text-red-800 text-xs font-semibold px-3 py-1 rounded-full">
          {inventory.length} Items
        </span>
      </div>

      <div className="space-y-3">
        {inventory.map((item) => (
          <div
            key={item.id}
            className={`p-4 border-l-4 rounded transition-all hover:shadow-md ${getBgColor(
              item.color
            )}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className={`font-semibold ${getTextColor(item.color)}`}>
                  {item.name}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {item.amount} tersisa ({item.percentage})
                </p>
              </div>
              <button className="ml-4 px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded text-sm font-medium transition-colors">
                Restock
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-6 w-full py-2 border-2 border-amber-500 text-amber-600 hover:bg-amber-50 font-medium rounded-lg transition-colors">
        Lihat Inventori Lengkap →
      </button>
    </div>
  );
}
