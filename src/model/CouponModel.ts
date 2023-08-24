export interface CouponModel {
  count: number;
  expiredDate: string;
  value: number;
  couponCode?: string | null;
  discountType: string;
  couponTrait: string;
  couponType: string;
  prefix: string;
  name: string;
  contents: string;
}

export interface CreateCouponResponse {
  name: string;
}

export interface CreateCouponResponse extends Array<CreateCouponResponse> {}

export interface RegisterCouponModel {
  couponCodes: [],
  userIds: []
}