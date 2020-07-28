import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { HelperService } from 'src/app/shared/services/helper.service';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    private _types: string[] = ['general', 'custom'];
    private _collection: string = 'users';

    constructor(
        private _db: AngularFireDatabase,
        private _helper: HelperService,
    ) { }

    public getWords(type: string, doneCallback: (items: any[]) => void) {
        if (this._types.includes(type)) {
            this._db.list(this.toCollection(type)).snapshotChanges().subscribe((itemsSnapshot: any[]) => {
                let items: any[] = [];
                itemsSnapshot.forEach((itemSnapshot: any) => {
                    items.push({
                        key: itemSnapshot.key,
                        ...itemSnapshot.payload.toJSON(),
                    })
                })
                if (this._helper.isFn(doneCallback)) doneCallback(items);
            })
        } else if (this._helper.isFn(doneCallback)) doneCallback([]);
    }

    public deleteWord(type: string, key: string, doneCallback?: () => void) {
        if (this._types.includes(type)) {
            if (key.trim() != '') {
                this._db.list(this.toCollection(type)).remove(key).then(() => {
                    if (this._helper.isFn(doneCallback)) doneCallback();
                });
            }
        }
    }

    public addWord(type: string, data: any, doneCallback?: () => void) {
        if (this._types.includes(type)) {
            if (data.incorrect.trim() != '' && data.correct.trim() != '') {
                let item: any = {
                    incorrect: data.incorrect,
                    correct: data.correct,
                }
                this._db.list(this.toCollection(type)).push(item).then(() => {
                    if (this._helper.isFn(doneCallback)) doneCallback();
                });
            }
        }
    }

    private toCollection(type: string): string {
        return `${type}-words`;
    }

    //-------------

    private pushDefaultData(): void {
        console.log('push data');
        let generalWords =
            [
                {
                    "incorrect": "bác sỹ",
                    "correct": "bác sĩ"
                },
                {
                    "incorrect": "bộ sương",
                    "correct": "bộ xương"
                },
                {
                    "incorrect": "cặp bến",
                    "correct": "cập bến"
                },
                {
                    "incorrect": "câu truyện",
                    "correct": "câu chuyện"
                },
                {
                    "incorrect": "chẵng lẻ",
                    "correct": "chẳng lẽ"
                },
                {
                    "incorrect": "chia sẽ",
                    "correct": "chia sẻ"
                },
                {
                    "incorrect": "chín mùi",
                    "correct": "chín muồi"
                },
                {
                    "incorrect": "chỉnh chu",
                    "correct": "chỉn chu"
                },
                {
                    "incorrect": "chỉnh sữa",
                    "correct": "chỉnh sửa"
                },
                {
                    "incorrect": "chuẩn đoán",
                    "correct": "chẩn đoán"
                },
                {
                    "incorrect": "có lẻ",
                    "correct": "có lẽ"
                },
                {
                    "incorrect": "cổ máy",
                    "correct": "cỗ máy"
                },
                {
                    "incorrect": "cọ sát",
                    "correct": "cọ xát"
                },
                {
                    "incorrect": "dư giả",
                    "correct": "dư dả"
                },
                {
                    "incorrect": "đường xá",
                    "correct": "đường sá"
                },
                {
                    "incorrect": "gian sảo",
                    "correct": "gian xảo"
                },
                {
                    "incorrect": "giành dụm",
                    "correct": "dành dụm"
                },
                {
                    "incorrect": "giọt xương",
                    "correct": "giọt sương"
                },
                {
                    "incorrect": "giữ dội",
                    "correct": "dữ dội"
                },
                {
                    "incorrect": "giục giã",
                    "correct": "giục dã"
                },
                {
                    "incorrect": "giúp đở",
                    "correct": "giúp đỡ"
                },
                {
                    "incorrect": "kết cuộc",
                    "correct": "kết cục"
                },
                {
                    "incorrect": "khán giã",
                    "correct": "khán giả"
                },
                {
                    "incorrect": "kiễm tra",
                    "correct": "kiểm tra"
                },
                {
                    "incorrect": "kỹ niệm",
                    "correct": "kỷ niệm"
                },
                {
                    "incorrect": "mạnh dạng",
                    "correct": "mạnh dạn"
                },
                {
                    "incorrect": "năng nỗ",
                    "correct": "năng nổ"
                },
                {
                    "incorrect": "nền tản",
                    "correct": "nền tảng"
                },
                {
                    "incorrect": "nghành",
                    "correct": "ngành"
                },
                {
                    "incorrect": "nổ lực",
                    "correct": "nỗ lực"
                },
                {
                    "incorrect": "rãnh rỗi",
                    "correct": "rảnh rỗi"
                },
                {
                    "incorrect": "rốt cục",
                    "correct": "rốt cuộc"
                },
                {
                    "incorrect": "sắc xảo",
                    "correct": "sắc sảo"
                },
                {
                    "incorrect": "sẳn sàng",
                    "correct": "sẵn sàng"
                },
                {
                    "incorrect": "san sẽ",
                    "correct": "san sẻ"
                },
                {
                    "incorrect": "sáng lạng",
                    "correct": "xán lạn"
                },
                {
                    "incorrect": "sỡ dĩ",
                    "correct": "sở dĩ"
                },
                {
                    "incorrect": "sơ xuất",
                    "correct": "sơ suất"
                },
                {
                    "incorrect": "sử lý",
                    "correct": "xử lý"
                },
                {
                    "incorrect": "sữa chữa",
                    "correct": "sửa chữa"
                },
                {
                    "incorrect": "suất sắc",
                    "correct": "xuất sắc"
                },
                {
                    "incorrect": "suông sẻ",
                    "correct": "suôn sẻ"
                },
                {
                    "incorrect": "thăm quan",
                    "correct": "tham quan"
                },
                {
                    "incorrect": "thẳng thắng",
                    "correct": "thẳng thắn"
                },
                {
                    "incorrect": "tháo dở",
                    "correct": "tháo dỡ"
                },
                {
                    "incorrect": "trãi nghiệm",
                    "correct": "trải nghiệm"
                },
                {
                    "incorrect": "trao chuốt",
                    "correct": "trau chuốt"
                },
                {
                    "incorrect": "trao dồi",
                    "correct": "trau dồi"
                },
                {
                    "incorrect": "trao giồi",
                    "correct": "trau dồi"
                },
                {
                    "incorrect": "tựu chung",
                    "correct": "tựu trung"
                },
                {
                    "incorrect": "vô hình chung",
                    "correct": "vô hình trung"
                },
                {
                    "incorrect": "vô vàng",
                    "correct": "vô vàn"
                },
                {
                    "incorrect": "xáng lạng",
                    "correct": "xán lạn"
                },
                {
                    "incorrect": "xem sét",
                    "correct": "xem xét"
                },
                {
                    "incorrect": "xuất xắc",
                    "correct": "xuất sắc"
                },
                {
                    "incorrect": "xúi dục",
                    "correct": "xúi giục"
                }
            ]
        let customWords =
            [
                {
                    "incorrect": "(cháu|chúa)",
                    "correct": "Chúa"
                },
                {
                    "incorrect": "(chúa cha|cháu cha)",
                    "correct": "Chúa Cha"
                },
                {
                    "incorrect": "(ocn|cno|nco)",
                    "correct": "con"
                },
                {
                    "incorrect": "(thiên chúa cha| thiêng chúa cha)",
                    "correct": "Thiên Chúa Cha"
                },
                {
                    "incorrect": "(thiêng chúa|thiên cháu|thiêng cháu|thiên chúa)",
                    "correct": "Thiên Chúa"
                },
                {
                    "incorrect": "chúa thánh thần",
                    "correct": "Chúa Thánh Thần"
                },
                {
                    "incorrect": "đấng",
                    "correct": "Đấng"
                },
                {
                    "incorrect": "đười",
                    "correct": "đời"
                },
                {
                    "incorrect": "giêsu",
                    "correct": "Giê-su"
                },
                {
                    "incorrect": "giuse",
                    "correct": "Giu-se"
                },
                {
                    "incorrect": "lạy cha",
                    "correct": "lạy Cha"
                },
                {
                    "incorrect": "ma\\-ri\\-a",
                    "correct": "Maria"
                },
                {
                    "incorrect": "mai mai",
                    "correct": "mãi mãi"
                },
                {
                    "incorrect": "ngài",
                    "correct": "Ngài"
                },
                {
                    "incorrect": "tin mừng",
                    "correct": "Tin Mừng"
                },
                {
                    "incorrect": "vường",
                    "correct": "vườn"
                }
            ]

        this._db.list('general-words').remove()
            .then(() => {
                for (let word of generalWords) {
                    this._db.list('general-words').push(word)
                }
            })

        this._db.list('custom-words').remove()
            .then(() => {
                for (let word of customWords) {
                    this._db.list('custom-words').push(word)
                }
            })
    }

    private read(): void {
        this._db.list(this._collection).snapshotChanges().subscribe((itemsSnapshot: any[]) => {
            let items: any[] = [];
            itemsSnapshot.forEach((itemSnapshot) => {
                items.push({
                    key: itemSnapshot.key,
                    ...itemSnapshot.payload.toJSON()
                })
            })
            console.log(items);
        })
    }

    private create(): void {
        this._db.list(this._collection).remove()
            .then(() => {
                for (let i = 1; i <= 10; i++) {
                    this._db.list(this._collection).push({
                        username: `user ${i}`,
                    })
                }
            })
    }

}
