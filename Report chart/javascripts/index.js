
var profileData = [
    {profile: "SH_LOAD_SANITY_FOADM3",	date: "2/3/2020",	total:4410,	failed:1630,	checked:1300,	feedback:100},
    {profile: "SH_LOAD_SANITY_FOADM",	date: "2/3/2020",	total:7332,	failed:2030,	checked:1630,	feedback:393},
    {profile: "SH_LOAD_SANITY_INFRA_PSS16",	date: "2/3/2020",	total:3857,	failed:1240,	checked:536,	feedback:131},
    {profile: "SH_OT_ESNCP_WEEKLY_PROFILE_1",	date: "2/3/2020",	total:3948,	failed:197,	checked:87,	feedback:67},
    {profile: "SH_OT_PM_COUNT",	date: "2/3/2020",	total:4762,	failed:872,	checked:530,	feedback:40},
    {profile: "SH_1830TPS_FM_ALARM_CHECK",	date: "2/3/2020",	total:6432,	failed:421,	checked:128,	feedback:210},
    {profile: "SH_1830TPS_TRAFFIC_ELINE_TRAFFIC_DWDM_WJF",	date: "2/3/2020",	total:8023,	failed:1328,	checked:1328,	feedback:450},
    {profile: "infra",	date: "2/3/2020",	total:7439,	failed:2140,	checked:1378,	feedback:32},
    {profile: "SH_1830TPS_TRAFFIC_ELINE_TPS24_TPS24_TRAFFIC_MIXEDRATE",	date: "2/3/2020",	total:1833,	failed:352,	checked:350,	feedback:170},
];
var testerData = [
    {username: "billlu",	date:"2/10/2020",	total:421,	failed:63,	checked:30,	feedback:12},
    {username: "mazhong",	date:"2/10/2020",	total:730,	failed:203,	checked:134,	feedback:2},
    {username: "songpeng",	date:"2/10/2020",	total:384,	failed:24,	checked:24,	feedback:1},
    {username: "A",	date:"2/10/2020",	total:390,	failed:120,	checked:20,	feedback:5},
    {username: "B",	date:"2/10/2020",	total:479,	failed:20,	checked:20,	feedback:4},
    {username: "C",	date:"2/10/2020",	total:649,	failed:73,	checked:49,	feedback:21},
    
];


// AI Classification	Count	Tester Feedback
var AIFeedbackData = [
    {AIClassification:"Product Defects", 	count:170,	feedback:42},
    {AIClassification:"Traffic Issue",	count:63,	feedback:23},
    {AIClassification:"Configuration Issue",	count:46,	feedback:12},
    {AIClassification:"Platform  Issue",	count:12,	feedback:2},
    {AIClassification:"Connection Issue", 	count:34,	feedback:2},
    {AIClassification:"Instrument Issue",	count:134,	feedback:14},
]


// Profile	Failed case(在画表格时，请用图片+link)	Failed Log	AI Classification	Tester Feedback
var feedbackSummaryData = [
    {profile:"SH_LOAD_SANITY_FOADM3",	link:"http://135.252.217.105/~build_load/QFA/SH_TARG_SVT_BUILD_SANITY_4/SH_LOAD_SANITY_FOADM3/200130051715/logs/falcon_load_OADM_common_upgrade_Testcase-1/",	failedlog:"Test step failed. Reason: alarm ON incorrect",	AIClassification:"Config Issue",	TesterFeedback:"Product Issue"},
    {profile:"SH_LOAD_SANITY_FOADM3",	link:"http://135.252.217.105/~build_load/QFA/SH_TARG_SVT_BUILD_SANITY_4/SH_LOAD_SANITY_FOADM3/200211153801/logs/falcon_load_OADM_common_check_Testcase-3/",	failedlog:"Test step failed. Reason: alarm OFF incorrect",	AIClassification:"Config Issue",	TesterFeedback:"Product Issue"},
    {profile:"SH_OT_PM_COUNT",	link:"http://135.252.217.105/~build_load/QFA/SH_TARG_SVT_BUILD_SANITY_4/SH_SVT_SANITY_DAILY_BLD1_BATCH/200211115240/logs/test_case_results.html",	failedlog:"Test step failed. Reason: alarm ON incorrect",	AIClassification:"Config Issue",	TesterFeedback:"Product Issue"},
]

var profileCategoryX = [];
var profileTotalData = [];
var profileFailedData = [];
var profileCheckedData = [];
var profileFeedbackData = [];

var testerCategoryX = [];
var testerTotalData = [];
var testerFailedData = [];
var testerCheckedData = [];
var testerFeedbackData = [];


var AIFeedbackCategoryX = [];
var AIFeedbackCountData = [];
var AIFeedbackTesterData = []

profileData.forEach(function(element, index) {
    profileCategoryX.push(element.profile);
    profileTotalData.push(element.total);
    profileFailedData.push(element.failed);
    profileCheckedData.push(element.checked);
    profileFeedbackData.push(element.feedback);
});

AIFeedbackData.forEach(function(element, index) {
    AIFeedbackCategoryX.push(element.AIClassification);
    AIFeedbackCountData.push(element.count);
    AIFeedbackTesterData.push(element.feedback);
});

testerData.forEach(function(element, index) {
    testerCategoryX.push(element.username);
    testerTotalData.push(element.total);
    testerFailedData.push(element.failed);
    testerCheckedData.push(element.checked);
    testerFeedbackData.push(element.feedback);
});

var dom1 = document.getElementById("bar-label-rotation1");
var myChart1 = echarts.init(dom1);
var dom2 = document.getElementById("bar-label-rotation2");
var myChart2 = echarts.init(dom2);
var dom3 = document.getElementById("bar-label-rotation3");
var myChart3 = echarts.init(dom3);
var app = {};
var posList = [
    'left', 'right', 'top', 'bottom',
    'inside',
    'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
    'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
];

app.configParameters = {
    rotate: {
        min: -90,
        max: 90
    },
    align: {
        options: {
            left: 'left',
            center: 'center',
            right: 'right'
        }
    },
    verticalAlign: {
        options: {
            top: 'top',
            middle: 'middle',
            bottom: 'bottom'
        }
    },
    position: {
        options: echarts.util.reduce(posList, function (map, pos) {
            map[pos] = pos;
            return map;
        }, {})
    },
    distance: {
        min: 0,
        max: 100
    }
};

app.config = {
    rotate: 90,
    align: 'left',
    verticalAlign: 'middle',
    position: 'insideBottom',
    distance: 15,
    onChange: function () {
        var labelOption = {
            normal: {
                rotate: app.config.rotate,
                align: app.config.align,
                verticalAlign: app.config.verticalAlign,
                position: app.config.position,
                distance: app.config.distance
            }
        };
        myChart.setOption({
            series: [{
                label: labelOption
            }, {
                label: labelOption
            }, {
                label: labelOption
            }, {
                label: labelOption
            }]
        });
    }
};


var labelOption = {
    // show: true,
    position: app.config.position,
    distance: app.config.distance,
    align: app.config.align,
    verticalAlign: app.config.verticalAlign,
    rotate: app.config.rotate,
    formatter: '{c}  {name|{a}}',
    fontSize: 16,
    rich: {
        name: {
            textBorderColor: '#fff'
        }
    }
};

function getOption1(categoryX, totalData, failedData, checkedData, feedbackData){
    var option = null;
    option = {
        color: ['#2f4554','#c23531', '#61a0a8', '#d48265'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['Total run', 'Failed', 'Checked', 'Feedback']
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {show: false},
                // data: ['2012', '2013', '2014', '2015', '2016']
                data: categoryX
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Total run',
                type: 'bar',
                barGap: 0,
                label: labelOption,
                // data: [320, 332, 301, 334, 390]
                data: totalData
            },
            {
                name: 'Failed',
                type: 'bar',
                label: labelOption,
                // data: [220, 182, 191, 234, 290]
                data: failedData
            },
            {
                name: 'Checked',
                type: 'bar',
                label: labelOption,
                // data: [150, 232, 201, 154, 190]
                data: checkedData
            },
            {
                name: 'Feedback',
                type: 'bar',
                label: labelOption,
                // data: [98, 77, 101, 99, 40]
                data: feedbackData
            }
        ]
    };
    return option;
}
function getOption2(categoryX, totalData, failedData,){
    var option = null;
    option = {
        color: ['#c23531','#2f4554'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['Count', 'Tester Feedback']
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {show: false},
                // data: ['2012', '2013', '2014', '2015', '2016']
                data: categoryX
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Count',
                type: 'bar',
                barGap: 0,
                label: labelOption,
                // data: [320, 332, 301, 334, 390]
                data: totalData
            },
            {
                name: 'Tester Feedback',
                type: 'bar',
                label: labelOption,
                // data: [220, 182, 191, 234, 290]
                data: failedData
            }
        ]
    };
    return option;
}

var option1 = getOption1(profileCategoryX, profileTotalData, profileFailedData, profileCheckedData, profileFeedbackData);
if (option1 && typeof option1 === "object") {
    myChart1.setOption(option1, true);
}
var option2 = getOption1(testerCategoryX, testerTotalData, testerFailedData, testerCheckedData, testerFeedbackData);
if (option2 && typeof option2 === "object") {
    myChart2.setOption(option2, true);
}


var option3 = getOption2(AIFeedbackCategoryX, AIFeedbackCountData, AIFeedbackTesterData);
if (option3 && typeof option3 === "object") {
    myChart3.setOption(option3, true);
}

$(function(){
    var $table1 = $('#table1')
    $table1.bootstrapTable({data: profileData})
    var $table2 = $('#table2')
    $table2.bootstrapTable({data: testerData})
    var $table2 = $('#table3')
    $table2.bootstrapTable({data: feedbackSummaryData})

})

function linkFormatter(value, row) {
    return '<a href="'+value+'" target="blank">go</a>';
}