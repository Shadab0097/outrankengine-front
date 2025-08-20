import React from 'react';
import { Clock, Zap, Target, TrendingUp, CheckCircle, AlertTriangle, Award, Users, Calendar, Globe } from 'lucide-react';

const ImplementationPlan = ({ data }) => {
    const plan = data?.comparison?.competitorInsights?.implementationPlan;
    const ourPlan = data?.comparison?.ourInsights?.implementationPlan;


    if (!plan || !ourPlan) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500 text-lg">Implementation plan data not available</p>
            </div>
        );
    }

    const getImpactColor = (impact) => {
        switch (impact?.toLowerCase() || impact) {
            case 'high': return 'bg-green-100 text-green-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'low': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getEffortColor = (effort) => {
        switch (effort?.toLowerCase() || effort) {
            case 'high': return 'bg-red-100 text-red-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'low': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const TaskCard = ({ task, impact, effort }) => (
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-gray-200/50 hover:shadow-lg transition-all duration-300 group">
            <p className="text-gray-800 mb-4 leading-relaxed font-medium">{task}</p>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Impact:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getImpactColor(impact)}`}>
                        {impact}
                    </span>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Effort:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getEffortColor(effort)}`}>
                        {effort}
                    </span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-8">
            {/* Quick Wins */}
            <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl p-8 border border-emerald-200/50 shadow-lg">
                <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl p-4 mr-4 shadow-lg">
                        <Zap className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">Quick Wins</h3>
                        <p className="text-gray-600 text-lg">High-impact, low-effort tasks to start immediately</p>
                        <div className="flex items-center mt-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
                            <span className="text-sm text-emerald-600 font-semibold">Priority Level: Urgent</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(ourPlan?.quickWins || []).map((item, index) => {
                        // Normalize the item
                        let taskObj;
                        if (typeof item === 'string') {
                            taskObj = { task: item, impact: '', effort: '' };
                        } else {
                            taskObj = {
                                task: item?.task || '',
                                impact: item?.impact || '',
                                effort: item?.effort || ''
                            };
                        }

                        return (
                            <TaskCard
                                key={index}
                                task={taskObj.task}
                                impact={taskObj.impact}
                                effort={taskObj.effort}
                            />
                        );
                    })}
                </div>
            </div>

            {/* Medium Term Goals */}
            {/* <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 border border-blue-200/50 shadow-lg">
                <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-4 mr-4 shadow-lg">
                        <Target className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">Medium-Term Goals</h3>
                        <p className="text-gray-600 text-lg">Strategic initiatives for sustained growth</p>
                        <div className="flex items-center mt-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                            <span className="text-sm text-blue-600 font-semibold">Timeline: 2-6 Months</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(plan.mediumTermGoals || []).map((task, index) => (
                        <TaskCard
                            key={index}
                            task={task.task}
                            impact={task.impact}
                            effort={task.effort}
                        />
                    ))}
                </div>
            </div> */}

            {/* Priority Matrix */}
            {/* {plan.priorityMatrix && plan.priorityMatrix.length > 0 && (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50">
                    <div className="flex items-center mb-6">
                        <div className="bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl p-3 mr-4">
                            <AlertTriangle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Priority Matrix</h3>
                            <p className="text-sm text-gray-500">Task prioritization framework</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {plan.priorityMatrix.map((priority, index) => (
                            <div key={index} className="bg-gradient-to-r from-gray-50 to-slate-100 border border-gray-200/50 rounded-xl p-6">
                                <div className="flex items-center mb-3">
                                    <div className={`rounded-xl p-3 mr-4 ${typeof priority.priority === 'string' && priority.priority.includes('P1') ? 'bg-gradient-to-r from-red-500 to-pink-500' :
                                        typeof priority.priority === 'string' && priority.priority.includes('P2') ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-gradient-to-r from-emerald-500 to-green-500'
                                        }`}>
                                        <AlertTriangle className="w-5 h-5 text-white" />
                                    </div>
                                    <h4 className="font-bold text-gray-900 text-lg">{priority.priority || priority.task}</h4>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                    {(priority.tasks || []).map((task, taskIndex) => (
                                        <div key={taskIndex} className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-gray-200/50 hover:shadow-md transition-all duration-200">
                                            <span className="text-sm font-medium text-gray-700">{task}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )} */}

            {/* Timeline */}
            {/* {plan.estimatedTimeline && plan.estimatedTimeline.length > 0 && (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50">
                    <div className="flex items-center mb-6">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-3 mr-4">
                            <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Implementation Timeline</h3>
                            <p className="text-sm text-gray-500">Phased execution roadmap</p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        {plan.estimatedTimeline.map((phase, index) => (
                            <div key={index} className="flex items-start group">
                                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-3 mr-4 shadow-lg group-hover:scale-110 transition-transform">
                                    <Clock className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-900 mb-3 text-lg">{phase.phase || phase.duration}</h4>
                                    <p className="text-gray-600 leading-relaxed">{phase.activities || phase.phase}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )} */}

            {/* Resource Requirements */}
            {/* {plan.requiredResources && plan.requiredResources.length > 0 && (
                <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-8 border border-purple-200/50 shadow-lg">
                    <div className="flex items-center mb-6">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 mr-4 shadow-lg">
                            <Users className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">Required Resources</h3>
                            <p className="text-gray-600 text-lg">Team members and skills needed for success</p>
                            <div className="flex items-center mt-2">
                                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
                                <span className="text-sm text-purple-600 font-semibold">Essential Team Composition</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {plan.requiredResources.map((resource, index) => (
                            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-5 text-center border border-purple-200/50 hover:shadow-lg transition-all duration-300 group">
                                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-3 mx-auto mb-3 w-fit">
                                    <Award className="w-6 h-6 text-purple-600 group-hover:scale-110 transition-transform" />
                                </div>
                                <span className="text-sm font-semibold text-gray-800">{resource}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )} */}

            {/* Long Term Strategy */}
            {/* {plan.longTermStrategy && plan.longTermStrategy.length > 0 && (
                <div className="bg-gradient-to-br from-indigo-50 to-blue-100 rounded-2xl p-8 border border-indigo-200/50 shadow-lg">
                    <div className="flex items-center mb-6">
                        <div className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl p-4 mr-4 shadow-lg">
                            <TrendingUp className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">Long-Term Strategy</h3>
                            <p className="text-gray-600 text-lg">Sustained growth initiatives</p>
                            <div className="flex items-center mt-2">
                                <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2 animate-pulse"></div>
                                <span className="text-sm text-indigo-600 font-semibold">Timeline: 6+ Months</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {plan.longTermStrategy.map((task, index) => (
                            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-gray-200/50 hover:shadow-lg transition-all duration-300 group">
                                <p className="text-gray-800 mb-4 leading-relaxed font-medium">
                                    {task.task || task.action || task}
                                </p>
                                {(task.impact || task.effort) && (
                                    <div className="flex items-center justify-between">
                                        {task.impact && (
                                            <div className="flex items-center space-x-2">
                                                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Impact:</span>
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getImpactColor(task.impact)}`}>
                                                    {task.impact}
                                                </span>
                                            </div>
                                        )}
                                        {task.effort && (
                                            <div className="flex items-center space-x-2">
                                                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Effort:</span>
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getEffortColor(task.effort)}`}>
                                                    {task.effort}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )} */}


            {/* Our Quick Wins */}
            {/* <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl p-8 border border-emerald-200/50 shadow-lg">


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(ourPlan?.quickWins || []).map((item, index) => {
                        // Normalize the item
                        let taskObj;
                        if (typeof item === 'string') {
                            taskObj = { task: item, impact: '', effort: '' };
                        } else {
                            taskObj = {
                                task: item?.task || '',
                                impact: item?.impact || '',
                                effort: item?.effort || ''
                            };
                        }

                        return (
                            <TaskCard
                                key={index}
                                task={taskObj.task}
                                impact={taskObj.impact}
                                effort={taskObj.effort}
                            />
                        );
                    })}
                </div>
            </div> */}

            {/* Medium Term Goals */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 border border-blue-200/50 shadow-lg">
                <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-4 mr-4 shadow-lg">
                        <Target className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">Medium-Term Goals</h3>
                        <p className="text-gray-600 text-lg">Strategic initiatives for sustained growth</p>
                        <div className="flex items-center mt-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                            <span className="text-sm text-blue-600 font-semibold">Timeline: 2-6 Months</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(ourPlan?.mediumTermGoals || []).map((item, index) => {
                        // Normalize the item
                        let taskObj;
                        if (typeof item === 'string') {
                            taskObj = { task: item, impact: '', effort: '' };
                        } else {
                            taskObj = {
                                task: item?.task || '',
                                impact: item?.impact || '',
                                effort: item?.effort || ''
                            };
                        }

                        return (
                            <TaskCard
                                key={index}
                                task={taskObj.task}
                                impact={taskObj.impact}
                                effort={taskObj.effort}
                            />
                        );
                    })}
                </div>

            </div>

            {/* Priority Matrix */}
            {/* {ourPlan?.priorityMatrix && ourPlan?.priorityMatrix?.length > 0 && (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50">
                    <div className="flex items-center mb-6">
                        <div className="bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl p-3 mr-4">
                            <AlertTriangle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Priority Matrix</h3>
                            <p className="text-sm text-gray-500">Task prioritization framework</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {ourPlan?.priorityMatrix?.map((priority, index) => (
                            <div key={index} className="bg-gradient-to-r from-gray-50 to-slate-100 border border-gray-200/50 rounded-xl p-6">
                                <div className="flex items-center mb-3">
                                    <div className={`rounded-xl p-3 mr-4 ${priority?.imapct === 'high' && priority?.effort === "high" ? 'bg-gradient-to-r from-red-500 to-pink-500' :
                                        priority?.effort === 'high' && priority?.imapct === 'medium' ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-gradient-to-r from-emerald-500 to-green-500'
                                        }`}>
                                        <AlertTriangle className="w-5 h-5 text-white" />
                                    </div>
                                    <h4 className="font-bold text-gray-900 text-lg">{priority?.priority || priority?.task}</h4>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">

                                    <div key={index} className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-gray-200/50 hover:shadow-md transition-all duration-200">
                                        <span className="text-sm font-medium text-gray-700">{priority?.task}</span>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )} */}

            {/* Timeline */}
            {ourPlan?.estimatedTimeline && ourPlan?.estimatedTimeline?.length > 0 && (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50">
                    <div className="flex items-center mb-6">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-3 mr-4">
                            <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Implementation Timeline</h3>
                            <p className="text-sm text-gray-500">Phased execution roadmap</p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        {ourPlan?.estimatedTimeline?.map((phase, index) => (
                            <div key={index} className="flex items-start group">
                                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-3 mr-4 shadow-lg group-hover:scale-110 transition-transform">
                                    <Clock className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-900 mb-3 text-lg">{phase?.phase || phase?.duration}</h4>
                                    <p className="text-gray-600 leading-relaxed">{phase?.activities || phase?.phase}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Resource Requirements */}
            {ourPlan?.requiredResources && ourPlan?.requiredResources?.length > 0 && (
                <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-8 border border-purple-200/50 shadow-lg">
                    <div className="flex items-center mb-6">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 mr-4 shadow-lg">
                            <Users className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">Required Resources</h3>
                            <p className="text-gray-600 text-lg">Team members and skills needed for success</p>
                            <div className="flex items-center mt-2">
                                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
                                <span className="text-sm text-purple-600 font-semibold">Essential Team Composition</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {ourPlan?.requiredResources?.map((resource, index) => (
                            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-5 text-center border border-purple-200/50 hover:shadow-lg transition-all duration-300 group">
                                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-3 mx-auto mb-3 w-fit">
                                    <Award className="w-6 h-6 text-purple-600 group-hover:scale-110 transition-transform" />
                                </div>
                                <span className="text-sm font-semibold text-gray-800">{resource}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Long Term Strategy */}
            {ourPlan?.longTermStrategy && ourPlan?.longTermStrategy.length > 0 && (
                <div className="bg-gradient-to-br from-indigo-50 to-blue-100 rounded-2xl p-8 border border-indigo-200/50 shadow-lg">
                    <div className="flex items-center mb-6">
                        <div className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl p-4 mr-4 shadow-lg">
                            <TrendingUp className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">Long-Term Strategy</h3>
                            <p className="text-gray-600 text-lg">Sustained growth initiatives</p>
                            <div className="flex items-center mt-2">
                                <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2 animate-pulse"></div>
                                <span className="text-sm text-indigo-600 font-semibold">Timeline: 6+ Months</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {ourPlan?.longTermStrategy?.map((task, index) => (
                            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-gray-200/50 hover:shadow-lg transition-all duration-300 group">
                                <p className="text-gray-800 mb-4 leading-relaxed font-medium">
                                    {task?.task || task?.action || task}
                                </p>
                                {(task?.impact || task?.effort) && (
                                    <div className="flex items-center justify-between">
                                        {task?.impact && (
                                            <div className="flex items-center space-x-2">
                                                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Impact:</span>
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getImpactColor(task?.impact)}`}>
                                                    {task?.impact}
                                                </span>
                                            </div>
                                        )}
                                        {task.effort && (
                                            <div className="flex items-center space-x-2">
                                                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Effort:</span>
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getEffortColor(task?.effort)}`}>
                                                    {task?.effort}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImplementationPlan;