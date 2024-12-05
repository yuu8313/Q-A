const quizData = {
    set1: {
        name: "一般常識",
        questions: [
            {
                question: "日本の首都は？",
                type: "multiple",
                options: ["大阪", "東京", "名古屋", "福岡"],
                correct: 1,
                hint: "関東地方にある都市です",
                explanation: "東京は1868年の明治維新以降、日本の首都として機能しています。"
            },
            {
                question: "富士山の標高は何メートルですか？",
                type: "text",
                correct: "3776",
                hint: "数字三桁です",
                explanation: "富士山の標高は3776メートルです。"
            },

            {
                question: "日本で一番長い川は？",
                type: "multiple",
                options: ["信濃川", "利根川", "天竜川", "淀川"],
                correct: 0,
                hint: "新潟県と長野県に関係があります",
                explanation: "信濃川は日本最長の川で、全長367kmです。"
            },

            {
                question: "日本で最も北に位置する都道府県は？",
                type: "multiple",
                options: ["北海道", "青森県", "岩手県", "秋田県"],
                correct: 0,
                hint: "札幌市があります",
                explanation: "北海道は日本の最北端に位置する都道府県です。"
            },

            {
                question: "日本の国旗は？",
                type: "multiple",
                options: ["🇫🇷", "🇺🇸", "🇬🇧", "🇩🇪", "🇮🇹", "🇯🇵", "🇨🇦"],
                correct: 5,
                hint: "日章旗と呼ばれます",
                explanation: "日本の国旗は白地に赤い円が描かれた旗で、日の出を象徴しています。"
            },

            {
                question: "日本の国の鳥は？",
                type: "multiple",
                options: ["ツル", "キジ", "スズメ", "ワシ"],
                correct: 1,
                hint: "桃太郎の物語に登場します",
                explanation: "キジは日本の国鳥に指定されています。"
            },

            {
                question: "東京オリンピックが開催されたのは何年？",
                type: "text",
                correct: "にせんにじゅう",
                hint: "新型コロナウイルスの影響で延期されました",
                explanation: "2020年東京オリンピックは新型コロナウイルスの影響で2021年に開催されました。"
            },

            {
                question: "日本で最初に世界遺産に登録された場所は？",
                type: "multiple",
                options: ["白神山地", "法隆寺", "屋久島", "日光"],
                correct: 1,
                hint: "奈良県にあるお寺です",
                explanation: "法隆寺は1993年に日本で最初に世界遺産に登録されました。"
            },

            {
                question: "日本の通貨単位は？（漢字一文字）",
                type: "text",
                correct: "円",
                hint: "紙幣や硬貨に使われます",
                explanation: "日本の通貨単位は「円」です。"
            },

            {
                question: "奈良県にある巨大な仏像のあるお寺は？",
                type: "text",
                correct: "東大寺",
                hint: "奈良公園にあります　漢字四文字",
                explanation: "奈良の大仏は東大寺にある有名な仏像です。"
            },

            {
                question: "日本三名園の一つで石川県にある庭園の名前は？　ひらがな六文字",
                type: "text",
                correct: "けんろくえん",
                hint: "兼六園とも書きます",
                explanation: "兼六園は石川県金沢市にある日本三名園の一つです。"
            },
            {
            question: "日本の祝日「成人の日」はいつ？",
                type: "multiple",
                options: ["1月の第1月曜日", "1月の第2月曜日", "1月15日", "2月11日"],
                correct: 1,
                hint: "1月の2回目の月曜日です",
                explanation: "成人の日は1999年までは1月15日でしたが、現在は1月の第2月曜日に移動しました。"
            },

            {
            question: "日本の四国にある県の数は？（漢数字で）",
                type: "text",
                correct: "四",
                hint: "四という数字に関連しています",
                explanation: "四国には徳島県、高知県、愛媛県、香川県の4つの県があります。"
            },

            {
                question: "日本の最東端の島は？",
                type: "multiple",
                options: ["択捉島", "南鳥島", "与那国島", "沖ノ鳥島"],
                correct: 3,
                hint: "鳥が文字に入ります",
                explanation: "沖ノ鳥島は、日本最南端の無人島で、サンゴ礁上に存在します。"
            },

            {
                uestion: "日本の国花は？",
                type: "multiple",
                options: ["さくら", "うめ", "すいせん", "きんもくせい"],
                correct: 3,
                hint: "春に咲きます",
                explanation: "桜は日本の国花で、春の訪れを象徴し、儚さや美しさを表現しています。"
            },

        {
            question: "日本で最も高いビルは？（2023年まで）",
            type: "multiple",
            options: ["あべのハルカス", "麻布台ヒルズ 森JPタワー", "横浜ランドマークタワー", "ミッドランドスクエア"],
            correct: 3,
            hint: "東京都港区にあります。",
            explanation: "森JPタワーは、2023年に完成し、日本で最も高いビルとして330メートルの高さを誇ります。"
        }
        ]
    },
    set2: {
        name: "世界の地理",
        questions: [
            {
                question: "フランスの首都は？",
                type: "multiple",
                options: ["ロンドン", "ベルリン", "パリ", "マドリード"],
                correct: 2,
                hint: "エッフェル塔がある都市です",
                explanation: "パリはフランスの首都で、芸術と文化の中心地として知られています。"
            },
            {
                question: "ナイル川が流れる大陸は？",
                type: "text",
                correct: "アフリカ",
                hint: "世界最長の川です",
                explanation: "ナイル川はアフリカ大陸を流れる世界最長の川です。"
            }
        ]
    }
};