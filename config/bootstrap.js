/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function() {
    // sails.jwt = require('jsonwebtoken');
    // const Crypptr = require('cryptr');
    // sails.crypt = new Crypptr('FarhadLavaei@123#');

    // By convention, this is a good place to set up fake data during development.
    //
    // For example:
    // ```
    // // Set up fake development data (or if we already have some, avast)
    // if (await User.count() > 0) {
    //   return;
    // }
    //
    // await User.createEach([
    //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
    //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
    //   // etc.
    // ]);
    // ```

    // remove and add questions
    await Questions.destroy({});

    // await Questions.create({
    //     behaviorType: 'Alcohol',
    //     kind        : 'button',
    //     title       : 'آیا مصرف مشروبات الکی دارید؟',
    //     askSubAt    : 'yes',
    //     answers     : [
    //         {
    //             value: 'yes',
    //             title: 'بله'
    //         },
    //         {
    //             value: 'no',
    //             title: 'خیر'
    //         }
    //     ],
    //     sub_questions: [
    //         {
    //             title       : 'میزان مضرف الکل شما به چه صورت است؟',
    //             behaviorType: 'Diet',
    //             kind        : 'radio',
    //             answers     : [
    //                 {
    //                     value: '',
    //                     title: 'مایل به ذکر نیستم'
    //                 },
    //                 {
    //                     value: '1',
    //                     title: 'روزانه'
    //                 },
    //                 {
    //                     value: '2',
    //                     title: 'هتفگی'
    //                 },
    //                 {
    //                     value: '3',
    //                     title: 'دو هفته یکبار'
    //                 },
    //                 {
    //                     value: '4',
    //                     title: 'ماهانه'
    //                 },
    //                 {
    //                     value: '5',
    //                     title: 'هرازگاهی'
    //                 }
    //             ]
    //         }
    //     ]
    // }).fetch().then(out => {
    //     console.log(`Questions created : ${out.title}`);
    // });
    //
    // await Questions.create({
    //     behaviorType: 'Exercise',
    //     kind        : 'button',
    //     title       : 'مقدار ورزش روزانه شما چقدر است؟',
    //     askSubAt    : '',
    //     answers     : [
    //         {
    //             value: '0',
    //             title: 'ورزش نمی‌کنم'
    //         },
    //         {
    //             value: '1',
    //             title: 'کمتر از نیم ساعت'
    //         },
    //         {
    //             value: '2',
    //             title: 'نیم ساعت تا یک ساعت'
    //         },
    //         {
    //             value: '3',
    //             title: 'بیشتر از دو ساعت'
    //         },
    //         {
    //             value: '2',
    //             title: 'نیم ساعت تا یک ساعت'
    //         }
    //     ],
    //     sub_questions: []
    // }).fetch().then(out => {
    //     console.log(`Questions created : ${out.title}`);
    // });
    //
    // await Questions.create({
    //     behaviorType: 'Diet',
    //     kind        : 'checkbox',
    //     title       : 'در رژیم غذایی روزانه خود کدام یک از موارد زیر را قرار داده اید؟',
    //     answers     : [
    //         {
    //             value: 'vegetables',
    //             title: 'سبزیجات'
    //         },
    //         {
    //             value: 'low_fat',
    //             title: 'کم چرب'
    //         },
    //         {
    //             value: 'low_salt',
    //             title: 'کم نمک'
    //         },
    //         {
    //             value: 'low_sugar',
    //             title: 'کم شکر'
    //         }
    //     ],
    //     sub_questions: []
    // }).fetch().then(out => {
    //     console.log(`Questions created : ${out.title}`);
    // });
    //
    // await Questions.create({
    //     behaviorType: 'Smoke',
    //     kind        : 'checkbox',
    //     title       : 'آیا سیگار یا دیگر موارد دخانیات استعمال می‌کنید؟',
    //     answers     : [
    //         {
    //             value: 'yes',
    //             title: 'بله'
    //         },
    //         {
    //             value: 'no',
    //             title: 'خیر'
    //         }
    //     ],
    //     sub_questions: [
    //         {
    //             title            : 'میزان مصرف سیگار ؟',
    //             behaviorType     : 'Smoke',
    //             behaviorTypeChild: 'cigarette',
    //             kind             : 'multiText',
    //             answers          : [
    //                 {
    //                     value: '1',
    //                     title: 'به ندرت ، تقریبا ماهانه کمتر از ۵ نخ'
    //                 },
    //                 {
    //                     value: '2',
    //                     title: 'در جمع های دوستانه ، هفته ای کمتر از ۵ نخ'
    //                 },
    //                 {
    //                     value: '3',
    //                     title: 'مصرف روزانه کمتر از ۵ نخ'
    //                 },
    //                 {
    //                     value: '4',
    //                     title: 'روزانه ۵ تا ۱۰ نخ'
    //                 },
    //                 {
    //                     value: '5',
    //                     title: 'بیشتر از ۱۰ نخ در روز'
    //                 }
    //             ]
    //         },
    //         {
    //             title            : 'میزان مصرف فلیان ؟',
    //             behaviorType     : 'Smoke',
    //             behaviorTypeChild: 'hookah',
    //             kind             : 'multiText',
    //             answers          : [
    //                 {
    //                     value: '0',
    //                     title: 'به ندرت ، تقریبا ماهانه یک بار'
    //                 },
    //                 {
    //                     value: '2',
    //                     title: 'با جمع های دوستانه ، هفته ای یک بار'
    //                 },
    //                 {
    //                     value: '3',
    //                     title: 'مصرف روزانه ، یک بار'
    //                 },
    //                 {
    //                     value: '4',
    //                     title: 'روزانه یک تا دو بار'
    //                 },
    //                 {
    //                     value: '5',
    //                     title: 'بیشتر از دو بار در روز'
    //                 }
    //             ]
    //         },
    //         {
    //             title            : 'میزان مصرف فلیان ؟',
    //             behaviorType     : 'Smoke',
    //             behaviorTypeChild: 'hookah',
    //             kind             : 'multiText',
    //             answers          : [
    //                 {
    //                     value: '0',
    //                     title: 'به ندرت ، تقریبا ماهانه یک بار'
    //                 },
    //                 {
    //                     value: '2',
    //                     title: 'با جمع های دوستانه ، هفته ای یک بار'
    //                 },
    //                 {
    //                     value: '3',
    //                     title: 'مصرف روزانه ، یک بار'
    //                 },
    //                 {
    //                     value: '4',
    //                     title: 'روزانه یک تا دو بار'
    //                 },
    //                 {
    //                     value: '5',
    //                     title: 'بیشتر از دو بار در روز'
    //                 }
    //             ]
    //         },
    //         {
    //             title            : 'میزان مصرف فلیان ؟',
    //             behaviorType     : 'Smoke',
    //             behaviorTypeChild: 'hookah',
    //             kind             : 'multiText',
    //             answers          : [
    //                 {
    //                     value: '0',
    //                     title: 'به ندرت ، تقریبا ماهانه یک بار'
    //                 },
    //                 {
    //                     value: '2',
    //                     title: 'با جمع های دوستانه ، هفته ای یک بار'
    //                 },
    //                 {
    //                     value: '3',
    //                     title: 'مصرف روزانه ، یک بار'
    //                 },
    //                 {
    //                     value: '4',
    //                     title: 'روزانه یک تا دو بار'
    //                 },
    //                 {
    //                     value: '5',
    //                     title: 'بیشتر از دو بار در روز'
    //                 }
    //             ]
    //         }
    //     ]
    // }).fetch().then(out => {
    //     console.log(`Questions created : ${out.title}`);
    // });


    await Questions.create({
        behaviorType: 'Alcohol',
        kind        : 'button',
        title       : 'آیا مصرف مشروبات الکی دارید؟',
        askSubAt    : 'yes',
        answers     : [
            {
                value: 'yes',
                title: 'بله'
            },
            {
                value: 'no',
                title: 'خیر'
            }
        ],
        sub_questions: [
            {
                title            : 'میزان مضرف الکل شما به چه صورت است؟',
                behaviorType     : 'Alcohol',
                behaviorTypeChild: 'level',
                kind             : 'radio',
                answers          : [
                    {
                        value: '',
                        title: 'مایل به ذکر نیستم'
                    },
                    {
                        value: '1',
                        title: 'روزانه'
                    },
                    {
                        value: '2',
                        title: 'هتفگی'
                    },
                    {
                        value: '3',
                        title: 'دو هفته یکبار'
                    },
                    {
                        value: '4',
                        title: 'ماهانه'
                    },
                    {
                        value: '5',
                        title: 'هرازگاهی'
                    }
                ]
            }
        ]
    }).fetch().then(out => {
        console.log(`Questions created : ${out.title}`);
    });

    await Questions.create({
        behaviorType: 'Exercise',
        kind        : 'button',
        title       : 'مقدار ورزش روزانه شما چقدر است؟',
        askSubAt    : '',
        answers     : [
            {
                value: '1',
                title: 'ورزش نمی‌کنم'
            },
            {
                value: '2',
                title: 'کمتر از نیم ساعت'
            },
            {
                value: '3',
                title: 'نیم ساعت تا یک ساعت'
            },
            {
                value: '4',
                title: 'بیشتر از یک ساعت'
            },
            {
                value: '5',
                title: 'انجام ورزش حرفه ای'
            }
        ],
        sub_questions: []
    }).fetch().then(out => {
        console.log(`Questions created : ${out.title}`);
    });

    await Questions.create({
        behaviorType: 'Diet',
        kind        : 'checkbox',
        title       : 'در رژیم غذایی روزانه خود کدام یک از موارد زیر را قرار داده اید؟',
        answers     : [
            {
                value: 'vegetables',
                title: 'سبزیجات تازه'
            },
            {
                value: 'fruit',
                title: 'میوه'
            },
            {
                value: 'low_fat',
                title: 'کم چرب'
            },
            {
                value: 'low_salt',
                title: 'کم نمک'
            },
            {
                value: 'low_sugar',
                title: 'کم شکر'
            }
        ],
        sub_questions: []
    }).fetch().then(out => {
        console.log(`Questions created : ${out.title}`);
    });

    await Questions.create({
        behaviorType: 'Smoke',
        kind        : 'checkbox',
        title       : 'آیا مصرف روزانه دخانیات دارید؟',
        answers     : [
            {
                value: 'yes',
                title: 'بله'
            },
            {
                value: 'no',
                title: 'خیر'
            }
        ],
        sub_questions: [
            {
                title            : 'در صورت مصرف سیگار مقدار آن را بیان کنید',
                behaviorType     : 'Smoke',
                behaviorTypeChild: 'cigarette',
                kind             : 'radio',
                answers          : [
                    {
                        value: '5',
                        title: 'کمتر از 4 نخ در روز'
                    },
                    {
                        value: '4',
                        title: '4-8 نخ در روز'
                    },
                    {
                        value: '3',
                        title: '8-12 نخ در روز'
                    },
                    {
                        value: '2',
                        title: '12-16 نخ در روز'
                    },
                    {
                        value: '1',
                        title: 'بیشتر از یک بسته در روز'
                    }
                ]
            },
            {
                title            : 'در صورت مصرف قلیان مقدار آن را بیان کنید',
                behaviorType     : 'Smoke',
                behaviorTypeChild: 'hookah',
                kind             : 'radio',
                answers          : [
                    {
                        value: '1',
                        title: 'روزانه'
                    },
                    {
                        value: '2',
                        title: 'هفتگی'
                    },
                    {
                        value: '3',
                        title: 'هر 15 روز'
                    },
                    {
                        value: '4',
                        title: 'ماهانه'
                    },
                    {
                        value: '5',
                        title: 'هر از گاهی'
                    }
                ]
            },
            {
                title            : 'در صورت مصرف سایر دخانیات مقدار آن را بیان کنید',
                behaviorType     : 'Smoke',
                behaviorTypeChild: 'others',
                kind             : 'radio',
                answers          : [
                    {
                        value: '1',
                        title: 'روزانه به طور مداوم'
                    },
                    {
                        value: '2',
                        title: 'هفتگی'
                    },
                    {
                        value: '3',
                        title: 'هر 15 روز'
                    },
                    {
                        value: '4',
                        title: 'ماهانه'
                    },
                    {
                        value: '5',
                        title: 'هر از گاهی'
                    }
                ]
            }
        ]
    }).fetch().then(out => {
        console.log(`Questions created : ${out.title}`);
    });


    // console.log('CREATING DATABASE INDEX BY HAND');
    // // USER MODEL
    // const db = User.getDatastore().manager;
    // await db.collection(User.tableName).createIndex({ email: 1 }, { unique: true });
    // await db.collection(User.tableName).createIndex({ username: 1 }, { unique: true });
    //
    // // await initializeDatabase() // custom DB initialization...
    //
    // return done();
};
