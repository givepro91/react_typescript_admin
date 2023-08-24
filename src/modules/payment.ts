import Api from "../configs/apiConfigs";
import { CouponModel, CreateCouponResponse, RegisterCouponModel } from "../model/CouponModel";

export default class PaymentApi extends Api {
  async createCoupon(couponData: CouponModel) {
    const isCouponDataValid = () => {
      // Perform validation here
      return (
        couponData.count > 0 &&
        couponData.expiredDate !== "" &&
        couponData.value > 0 &&
        (couponData.couponCode !== "" || couponData.prefix !== "") &&
        couponData.discountType !== "" &&
        couponData.couponTrait !== "" &&
        couponData.couponType !== "" &&
        couponData.name !== "" &&
        couponData.contents !== ""
      );
    };

    if (!isCouponDataValid()) {
      throw new Error("Invalid coupon data");
    }

    if (couponData.couponCode === "" || couponData.prefix !== "") {
      couponData.couponCode = null;
    }

    try {
      const response = await super.post(
        `${process.env.REACT_APP_API_URL}/payment/admin/coupons`,
        JSON.stringify(couponData)
      );

      // const responseData = response.data as Array<CreateCouponResponse>;
      return response;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async registerCoupon(params: RegisterCouponModel) {
    if (params.couponCodes.length === 0 || params.userIds.length === 0) {
      throw new Error("Invalid Request Data");
    }

    if (params.couponCodes.length !== params.userIds.length) {
      throw new Error("쿠폰의 갯수와 사용자 수가 일치하지 않습니다.");
    }

    try {
      const response = await super.put(
        `${process.env.REACT_APP_API_URL}/payment/admin/coupons`,
        JSON.stringify(params)
      );
      return response;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
