import React, { useEffect, useState } from 'react';
import { getDashboardStats } from '../../api/network';

// 统计卡片组件
const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg flex items-center space-x-4 border-l-4" style={{ borderColor: color }}>
        <div className="p-3 rounded-full bg-gray-700 text-white">
            {icon}
        </div>
        <div>
            <p className="text-gray-400 text-sm uppercase font-bold tracking-wider">{title}</p>
            <h3 className="text-3xl font-bold text-white mt-1">{value}</h3>
        </div>
    </div>
);

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const data = await getDashboardStats();
                setStats(data);
            } catch (error) {
                console.error("加载看板数据失败", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadStats();
    }, []);

    if (isLoading) return <div className="text-white text-center py-20">数据加载中...</div>;
    if (!stats) return <div className="text-white text-center py-20">暂无数据</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">数据统计看板</h1>

            {/* 1. 核心指标卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard 
                    title="总用户数" 
                    value={stats.totalUsers} 
                    color="#3B82F6" // blue
                    icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>}
                />
                <StatCard 
                    title="作品总数" 
                    value={stats.totalArtworks} 
                    color="#10B981" // green
                    icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>}
                />
                <StatCard 
                    title="待审核作品" 
                    value={stats.pendingArtworks} 
                    color="#F59E0B" // yellow
                    icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
                />
                <StatCard 
                    title="总评论数" 
                    value={stats.totalComments} 
                    color="#EC4899" // pink
                    icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 2. 访问趋势图表 (模拟) */}
                <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6 shadow-lg">
                    <h3 className="text-xl font-bold text-white mb-6">本周访问趋势</h3>
                    <div className="h-64 flex items-end justify-between space-x-2 px-4">
                        {stats.weeklyVisits.map((val, idx) => (
                            <div key={idx} className="w-full flex flex-col items-center group relative">
                                {/* Tooltip */}
                                <span className="absolute -top-8 bg-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition mb-2 text-white">
                                    {val}
                                </span>
                                {/* Bar */}
                                <div 
                                    className="w-full bg-blue-600 hover:bg-blue-500 rounded-t transition-all duration-300" 
                                    style={{ height: `${(val / 300) * 100}%` }}
                                ></div>
                                {/* Label */}
                                <span className="text-gray-500 text-xs mt-2">
                                    {['周一', '周二', '周三', '周四', '周五', '周六', '周日'][idx]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. 最近活动动态 */}
                <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                    <h3 className="text-xl font-bold text-white mb-6">最近动态</h3>
                    <div className="space-y-6">
                        {stats.recentActivities && stats.recentActivities.map(activity => (
                            <div key={activity.id} className="flex items-start space-x-3">
                                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                                <div>
                                    <p className="text-sm text-gray-300">
                                        <span className="font-bold text-white">{activity.user}</span> 
                                        {' '}{activity.action}{' '}
                                        {activity.target && <span className="text-blue-400">"{activity.target}"</span>}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                        {(!stats.recentActivities || stats.recentActivities.length === 0) && (
                            <p className="text-gray-500 text-sm">暂无动态</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;