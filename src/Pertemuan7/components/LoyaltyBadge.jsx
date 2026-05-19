const loyaltyStyles = {
  Platinum: 'bg-purple-100 text-purple-700',
  Silver: 'bg-gray-100 text-gray-700',
  Gold: 'bg-orange-100 text-orange-700',
};

export default function LoyaltyBadge({ loyalty }) {
  return (
    <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg uppercase ${loyaltyStyles[loyalty] || loyaltyStyles.Gold}`}>
      {loyalty} Member
    </span>
  );
}
