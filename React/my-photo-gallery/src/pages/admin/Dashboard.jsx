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
    
    {/* 图表容器 */}
    <div className="h-64 relative px-4 flex items-end">
        {(() => {
            const data = stats.weeklyVisits;
            const labels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
            const maxVal = 300; // 这里的最大值需与你之前的一致，或者 Math.max(...data)
            
            // 计算坐标点的辅助函数 (返回百分比)
            const getPoints = () => {
                return data.map((val, idx) => {
                    const x = (idx / (data.length - 1)) * 100;
                    const y = 100 - (val / maxVal) * 100; // SVG是从上往下画，所以要用100减
                    return `${x},${y}`;
                }).join(' ');
            };

            return (
                <>
                    {/* 背景网格线 (可选) */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                        {[0, 1, 2, 3, 4].map((i) => (
                            <div key={i} className="border-t border-white w-full h-0"></div>
                        ))}
                    </div>

                    {/* SVG 线条层 */}
                    <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-0" preserveAspectRatio="none" viewBox="0 0 100 100">
                         {/* 渐变填充区域 */}
                        <defs>
                            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5" />
                                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <polygon 
                            points={`0,100 ${getPoints()} 100,100`} 
                            fill="url(#gradient)" 
                        />
                        
                        {/* 折线本身 */}
                        <polyline 
                            points={getPoints()} 
                            fill="none" 
                            stroke="#3B82F6" 
                            strokeWidth="2" 
                            vectorEffect="non-scaling-stroke" // 防止线条拉伸变形
                        />
                    </svg>

                    {/* 数据点与交互层 (Tooltip) */}
                    <div className="absolute inset-0 w-full h-full z-10">
                        {data.map((val, idx) => {
                            // 计算位置
                            const left = `${(idx / (data.length - 1)) * 100}%`;
                            const bottom = `${(val / maxVal) * 100}%`;

                            return (
                                <div 
                                    key={idx} 
                                    className="absolute group flex flex-col items-center"
                                    style={{ left: left, bottom: bottom, transform: 'translate(-50%, 50%)' }}
                                >
                                    {/* Tooltip */}
                                    <span className="absolute bottom-full mb-2 bg-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap text-white pointer-events-none z-20">
                                        {val} 次访问
                                    </span>
                                    
                                    {/* 圆点 (Hover时放大) */}
                                    <div className="w-3 h-3 bg-blue-600 rounded-full border-2 border-gray-800 group-hover:scale-150 group-hover:bg-white transition-transform duration-200 cursor-pointer shadow-sm"></div>

                                    {/* 底部标签 (X轴文字) */}
                                    <span className="absolute top-6 text-gray-500 text-xs whitespace-nowrap mt-2">
                                        {labels[idx]}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </>
            );
        })()}
    </div>
</div>
                {/* 3. 最近活动动态 */}
                <div className="bg-gray-800 rounded-lg p-6 shadow-lg" style={{ display: 'none' }}>
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