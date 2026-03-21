const ROLES = {
  FARMER: 'farmer',
  RESTAURANT: 'restaurant',
  INDUSTRIAL: 'industrial',
  CUSTOMER: 'customer',
  ADMIN: 'admin',
};

const SELLER_ROLES = [ROLES.FARMER, ROLES.RESTAURANT, ROLES.INDUSTRIAL];
const BUYER_ROLES = [ROLES.RESTAURANT, ROLES.INDUSTRIAL, ROLES.CUSTOMER];

function canBuyFrom(buyerRole, sellerRole) {
  if (buyerRole === ROLES.ADMIN) return false;
  if (sellerRole === ROLES.FARMER) return [ROLES.RESTAURANT, ROLES.INDUSTRIAL, ROLES.CUSTOMER].includes(buyerRole);
  if (sellerRole === ROLES.RESTAURANT) return buyerRole === ROLES.CUSTOMER;
  if (sellerRole === ROLES.INDUSTRIAL) return [ROLES.RESTAURANT, ROLES.CUSTOMER].includes(buyerRole);
  return false;
}

module.exports = { ROLES, SELLER_ROLES, BUYER_ROLES, canBuyFrom };
