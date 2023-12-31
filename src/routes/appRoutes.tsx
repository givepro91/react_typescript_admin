import HomePage from "../pages/home/HomePage";
import { RouteType } from "./config";
import ComponentPageLayout from "../pages/component/ComponentPageLayout";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import AlertPage from "../pages/component/AlertPage";
import ButtonPage from "../pages/component/ButtonPage";
import DocumentationPage from "../pages/documentation/DocumentationPage";
import OrdersPageLayout from "../pages/orders/OrdersPageLayout";
import CreateOrderPage from "../pages/orders/CreateOrderPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import LoginPage from "../pages/auth/LoginPage";
import CouponsPageLayout from "../pages/coupons/CouponsPageLayout";
import CreateCouponPage from "../pages/coupons/CreateCouponPage";
import RegisterCouponPage from "../pages/coupons/RegisterCouponPage";

const appRoutes: RouteType[] = [
  {
    index: true,
    element: <DashboardPage />,
    state: "dashboard"
  },
  {
    index: true,
    path: "/dashboard",
    element: <DashboardPage />,
    state: "dashboard",
    sidebarProps: {
      displayText: "Dashboard",
      icon: <DashboardOutlinedIcon />
    }
  },
  {
    path: "/orders",
    element: <OrdersPageLayout />,
    state: "orders",
    sidebarProps: {
      displayText: "주문",
      icon: <AppsOutlinedIcon />
    },
    child: [
      {
        path: "/orders/create",
        element: <CreateOrderPage />,
        state: "orders.create",
        sidebarProps: {
          displayText: "주문 생성"
        },
      },
      {
        path: "/orders/search",
        element: <CreateOrderPage />,
        state: "orders.search",
        sidebarProps: {
          displayText: "주문 조회"
        },
      }
    ]
  },
  {
    path: "/coupons",
    element: <CouponsPageLayout />,
    state: "coupons",
    sidebarProps: {
      displayText: "쿠폰",
      icon: <AppsOutlinedIcon />
    },
    child: [
      {
        path: "/coupons/create",
        element: <CreateCouponPage />,
        state: "coupons.create",
        sidebarProps: {
          displayText: "쿠폰 생성"
        },
      },
      {
        path: "/coupons/register",
        element: <RegisterCouponPage />,
        state: "coupons.register",
        sidebarProps: {
          displayText: "쿠폰 등록"
        },
      },
    ]
  },
  // {
  //   path: "/component",
  //   element: <ComponentPageLayout />,
  //   state: "component",
  //   sidebarProps: {
  //     displayText: "Components",
  //     icon: <AppsOutlinedIcon />
  //   },
  //   child: [
  //     {
  //       path: "/component/alert",
  //       element: <AlertPage />,
  //       state: "component.alert",
  //       sidebarProps: {
  //         displayText: "Alert"
  //       },
  //     },
  //     {
  //       path: "/component/button",
  //       element: <ButtonPage />,
  //       state: "component.button",
  //       sidebarProps: {
  //         displayText: "Button"
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: "/documentation",
  //   element: <DocumentationPage />,
  //   state: "documentation",
  //   sidebarProps: {
  //     displayText: "Documentation",
  //     icon: <ArticleOutlinedIcon />
  //   }
  // },
];

export default appRoutes;