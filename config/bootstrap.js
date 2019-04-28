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
    await Questions.create({
        behaviorType: 'Diet',
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
                title       : 'میزان مضرف الکل شما به چه صورت است؟',
                behaviorType: 'Diet',
                kind        : 'radio',
                answers     : [
                    {
                        value: '',
                        title: 'مایل به ذکر نیستم'
                    },
                    {
                        value: '1',
                        title: 'مصرف در مجالس شادی'
                    },
                    {
                        value: '2',
                        title: 'ماهانه کمتر از نیم لیتر'
                    },
                    {
                        value: '3',
                        title: 'ماهانه بین نیم لیتر تا یک لیتر'
                    },
                    {
                        value: '4',
                        title: 'مصرف هفتگی و یک لیتر به بالا'
                    },
                    {
                        value: '5',
                        title: 'مصرف روزانه'
                    }
                ]
            }
        ]
    }).fetch().then(out => {
        console.log(`Questions created : ${out.title}`);
    });

    await Questions.create({
        behaviorType: 'Allergies',
        kind        : 'button',
        title       : 'آیا آلرژی خاصی دارید؟',
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
                title       : 'آلرژی هایی که دارید را در کادر زیر وارد کنید',
                behaviorType: 'Allergies',
                kind        : 'multiText',
                answers     : []
            }
        ]
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
                title: 'سبزیجات'
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
        behaviorType: 'DiseaseHistory',
        kind        : 'checkbox',
        title       : 'سابقه بیماری های خاصی دارید؟',
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
                title       : 'لیست بیماری های خود را وارد کنید',
                behaviorType: 'DiseaseHistory',
                kind        : 'multiText',
                answers     : []
            }
        ]
    }).fetch().then(out => {
        console.log(`Questions created : ${out.title}`);
    });


    await Questions.create({
        behaviorType: 'Smoke',
        kind        : 'checkbox',
        title       : 'آیا سیگار یا دیگر موارد دخانیات استعمال می‌کنید؟',
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
                title       : 'میزان مصرف سیگار ؟',
                behaviorType: 'Smoke',
                kind        : 'multiText',
                answers     : [
                    {
                        value: '0',
                        title: 'به ندرت ، تقریبا ماهانه کمتر از ۵ نخ'
                    },
                    {
                        value: '2',
                        title: 'در جمع های دوستانه ، هفته ای کمتر از ۵ نخ'
                    },
                    {
                        value: '3',
                        title: 'مصرف روزانه کمتر از ۵ نخ'
                    },
                    {
                        value: '4',
                        title: 'روزانه ۵ تا ۱۰ نخ'
                    },
                    {
                        value: '5',
                        title: 'بیشتر از ۱۰ نخ در روز'
                    }
                ]
            },
            {
                title       : 'میزان مصرف فلیان ؟',
                behaviorType: 'Smoke',
                kind        : 'multiText',
                answers     : [
                    {
                        value: '0',
                        title: 'به ندرت ، تقریبا ماهانه یک بار'
                    },
                    {
                        value: '2',
                        title: 'با جمع های دوستانه ، هفته ای یک بار'
                    },
                    {
                        value: '3',
                        title: 'مصرف روزانه ، یک بار'
                    },
                    {
                        value: '4',
                        title: 'روزانه یک تا دو بار'
                    },
                    {
                        value: '5',
                        title: 'بیشتر از دو بار در روز'
                    }
                ]
            }
        ]
    }).fetch().then(out => {
        console.log(`Questions created : ${out.title}`);
    });

    await Questions.create({
        behaviorType: 'Medications',
        kind        : 'checkbox',
        title       : 'سابقه مصرف داروی خاصی دارید؟',
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
                title       : 'لیست داروهای مصرفی خود را وارد کنید',
                behaviorType: 'DiseaseHistory',
                kind        : 'multiText',
                answers     : []
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
