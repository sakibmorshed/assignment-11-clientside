import React, { useEffect, useState } from "react";
import {
  Utensils,
  ShoppingBag,
  TrendingUp,
  Heart,
  Award,
  Clock,
  DollarSign,
  Package,
} from "lucide-react";

const Welcome = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("Guest");

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        totalOrders: 12,
        pendingOrders: 3,
        totalFavorites: 8,
        totalSpent: 234.5,
      });
      setUserName("John");
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-500"></div>
      </div>
    );
  }

  const statCards = [
    {
      icon: <Package className="w-6 h-6" />,
      label: "Total Orders",
      value: stats?.totalOrders || 0,
      color: "bg-red-500",
      lightColor: "bg-red-50",
      darkLightColor: "dark:bg-red-900/20",
      textColor: "text-red-600 dark:text-red-400",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      label: "Pending Orders",
      value: stats?.pendingOrders || 0,
      color: "bg-orange-500",
      lightColor: "bg-orange-50",
      darkLightColor: "dark:bg-orange-900/20",
      textColor: "text-orange-600 dark:text-orange-400",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      label: "Favorites",
      value: stats?.totalFavorites || 0,
      color: "bg-pink-500",
      lightColor: "bg-pink-50",
      darkLightColor: "dark:bg-pink-900/20",
      textColor: "text-pink-600 dark:text-pink-400",
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      label: "Total Spent",
      value: `$${stats?.totalSpent?.toFixed(2) || 0}`,
      color: "bg-green-500",
      lightColor: "bg-green-50",
      darkLightColor: "dark:bg-green-900/20",
      textColor: "text-green-600 dark:text-green-400",
    },
  ];

  const quickActions = [
    {
      icon: <Utensils className="w-5 h-5" />,
      title: "Browse Meals",
      description: "Explore our delicious menu",
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-50 dark:bg-red-900/20",
    },
    {
      icon: <ShoppingBag className="w-5 h-5" />,
      title: "My Orders",
      description: "Track your order status",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Favorites",
      description: "View saved meals",
      color: "text-pink-600 dark:text-pink-400",
      bgColor: "bg-pink-50 dark:bg-pink-900/20",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-red-500 via-red-600 to-pink-600 rounded-3xl shadow-xl p-8 md:p-12 mb-8 transition-shadow duration-300 hover:shadow-2xl">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-pulse"></div>

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left Content */}
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4 transition-all duration-300 hover:bg-white/30">
                <Clock className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-medium">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
                Welcome , {userName}!
              </h1>
              <p className="text-white/90 text-lg md:text-xl max-w-2xl">
                Manage your meals, track orders, and explore delicious dishes
                all in one place.
              </p>
            </div>

            {/* Right Illustration */}
            <div className="hidden md:block">
              <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-transform duration-500 hover:scale-110 hover:rotate-12">
                <TrendingUp className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group"
          >
            <div
              className={`${stat.lightColor} ${stat.darkLightColor} w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}
            >
              <div className={`${stat.color} text-white p-2 rounded-lg`}>
                {stat.icon}
              </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
              {stat.label}
            </p>
            <p
              className={`text-3xl font-bold ${stat.textColor} transition-all duration-300`}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 md:p-8 mb-8 border border-gray-100 dark:border-gray-700 transition-shadow duration-300 hover:shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Quick Actions
          </h2>
          <div className="hidden sm:block text-sm text-gray-500 dark:text-gray-400">
            Get started with these shortcuts
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="group flex items-start gap-4 p-5 rounded-xl border-2 border-gray-100 dark:border-gray-700 hover:border-red-500 dark:hover:border-red-500 transition-all duration-300 hover:shadow-md text-left"
            >
              <div
                className={`${action.bgColor} p-3 rounded-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <div className={action.color}>{action.icon}</div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {action.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pro Tip Card */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start gap-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg transition-transform duration-300 hover:scale-110">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2"> Pro Tip</h3>
              <p className="text-white/90 text-sm">
                Save your favorite meals to quickly reorder them later. Build
                your personal collection!
              </p>
            </div>
          </div>
        </div>

        {/* Achievement Card */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start gap-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg transition-transform duration-300 hover:scale-110">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2"> Recent Activity</h3>
              <p className="text-white/90 text-sm">
                {stats?.totalOrders > 0
                  ? `You've placed ${stats.totalOrders} order${
                      stats.totalOrders > 1 ? "s" : ""
                    } so far. Keep exploring!`
                  : "Start your food journey by placing your first order!"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
