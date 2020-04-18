<div id="scene-form-register" class="scene scene-form-register" data-template="template-form-register" style="z-index: 1;">
    <noscript>
    <img src="https://ad.doubleclick.net/ddm/activity/src=9945659;type=zoowo0;cat=hk_kb00;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;ord=1?" width="1" height="1" alt=""/>
    </noscript>
    <section class="container-fluid register page">

        <div class="top-header">
            <div class="container header-logo-container">
                <div class="header-logo">
                    <a href="javascript:;" id="form-link-back-home" role="scene" data-target="home"><img src="img/kb-logo.jpg" alt="Kinder BUENO Logo"></a>
                </div>
            </div> <!-- .container .header-logo-container -->
        </div> <!-- .top-header -->

        <div class="container content">
            <div class="event-name-wrapper">
                <a href="javascript:;" id="form-link-back-home" role="scene" data-target="home">
                    <img src="img/header-img.png" alt="即抽即贏 英國魔法雙人行 遊覽哈利波特拍攝場景">
                </a>
            </div>

            <div class="enter-txt-wrapper">
                <img src="img/enter-txt.png" alt="請輸入以下資料">
            </div>

            <form role="form-register" class="form-register " enctype="multipart/form-data" method="POST">

                <input type="hidden" id="utm_source" name="utm_source" value="" />

                <div class="row">
                    <div class="col-auto"></div>
                    <div class="col-lg-8 col-md-10 col-sm-12 mx-auto">

                        <?php
                            use Basidio\DBTable;
                        ?>
                        <?php if (DEBUG): ?>
                        <?php
                            function randomDateInRange($start, $end) {
                                return date('Y-m-d H:i:s', rand(strtotime($start), strtotime($end)));
                            }
                        ?>
                            <style type="text/css">
                                .__debug_panel {
                                    padding: 1em;
                                    background-color: #bbb;
                                    font-family: SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
                                    overflow: auto;
                                    text-align: center;
                                }
                                .__debug_panel table {
                                    border-radius: 5px;
                                    width: 50%;
                                    margin: 0px auto;
                                    float: none;
                                    text-align: left;
                                }
                                .__debug_panel label {
                                    white-space: nowrap;
                                }

                                .__debug_panel input, .__debug_panel select, .__debug_panel input[type="checkbox"] {
                                    margin-bottom: 0em;
                                }

                                .__debug_panel input, .__debug_panel select {
                                    width: auto;
                                }
                            </style>
                            <div class="row text-center">
                                <div class="__debug_panel mx-auto my-3">
                                    <strong>Debug Panel</strong>
                                    <table border="1">
                                        <tr class="__debug_field_timestamp">
                                            <th style="min-width:5em;">提交時間</th>
                                            <td>
                                                <label>
                                                    <input type="radio" name="_debug_timestamp_mode" value="default" style="width: auto; padding: 0;" checked /> Now
                                                </label><br />
                                                <label>
                                                    <input type="radio" name="_debug_timestamp_mode" value="select" style="width: auto; padding: 0;" />
                                                    <select name="_debug_timestamp" style="border: 1px solid #333; width: auto; padding: 0;">
                                                        <option value="" disabled>Select a submission time</option>
                                                        <?php
                                                            $dbtable_period = DBTable::getTable('period');
                                                            $periods = $dbtable_period->fetchAll();
                                                            foreach ($periods as $key => $period) :
                                                                $id = $period->get('id');
                                                                $start = $period->get('start');
                                                                $end = $period->get('end');
                                                        ?>
                                                            <option value="" disabled>Week <?php echo $id . ' ' . date('Y-m-d', strtotime($start)) . ' - ' . date('Y-m-d', strtotime($end)); ?></option>
                                                            <option value="<?php echo $d=randomDateInRange($start, $end); ?>"><?php echo $d; ?></option>
                                                        <?php endforeach; ?>
                                                    </select>
                                                </label><br />
                                                <label>
                                                    <input type="radio" name="_debug_timestamp_mode" value="custom" style="width: auto; padding: 0;" />
                                                    <input type="text" name="_debug_timestamp_Y" size="4" maxlength="4" value="<?php echo date('Y'); ?>" style="width: auto; padding: 0;" />-
                                                    <input type="text" name="_debug_timestamp_m" size="2" maxlength="2" value="<?php echo date('m'); ?>" style="width: auto; padding: 0;" />-
                                                    <input type="text" name="_debug_timestamp_d" size="2" maxlength="2" value="<?php echo date('d'); ?>" style="width: auto; padding: 0;" />&nbsp;
                                                    <input type="text" name="_debug_timestamp_H" size="2" maxlength="2" value="<?php echo date('H'); ?>" style="width: auto; padding: 0;" />:
                                                    <input type="text" name="_debug_timestamp_i" size="2" maxlength="2" value="<?php echo date('i'); ?>" style="width: auto; padding: 0;" />:
                                                    <input type="text" name="_debug_timestamp_s" size="2" maxlength="2" value="<?php echo date('s'); ?>" style="width: auto; padding: 0;" />
                                                </label>
                                            </td>
                                        </tr>
                                        <tr class="__debug_field_prize">
                                            <th style="min-width:5em;">中獎機會</th>
                                            <td>
                                                <label>
                                                    <input type="radio" name="_debug_prize" value="" checked /> 隨機
                                                </label><br />
                                                <label>
                                                    <input type="radio" name="_debug_prize" value="0" /> 0%
                                                </label><br />
                                                <label>
                                                    <input type="radio" name="_debug_prize" value="travel_voucher" /> 100% - 旅遊套票
                                                </label>
                                                <label>
                                                    <input type="radio" name="_debug_prize" value="movie_ticket" /> 100% - 電影戲票
                                                </label>
                                            </td>
                                        </tr>
                                        <tr class="__debug_field_regen">
                                            <th>預填資料</th>
                                            <td>
                                                <button type="button" onclick="javascript:__debug_fx_receipt_random();">隨機</button>
                                                <button type="button" onclick="javascript:__debug_fx_receipt_reset();">清空</button>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <script type="text/javascript">
                                    $('.__debug_panel .__debug_field_timestamp').find('input[type="text"], select').on('focus', function (event) {
                                        $(event.target).closest('label').find('input[type="radio"]').prop('checked', true);
                                    });
                                </script>
                            </div>
                        <?php endif; ?>

                        <div class="error-msg-box-wrapper" style="display: none;">
                            <div class="sorry-msg-box"><img src="img/sorry-txt.png" alt="抱歉"></div>
                            <ul class="error-msg-box">
                                <li style="display: none;" class="error-msg trans_date_empty">請輸入收據上的收據日期</li>
                                <li style="display: none;" class="error-msg trans_date_invalid_format">請輸入正確收據日期</li>
                                <li style="display: none;" class="error-msg trans_date_invalid_range">請輸入有效收據日期</li>
                                <li style="display: none;" class="error-msg trans_location_empty">請輸入購物商戶</li>
                                <li style="display: none;" class="error-msg trans_location_invalid_format">請輸入正確購物商戶格式</li>
                                <li style="display: none;" class="error-msg trans_location_invalid_range">請輸入正確購物商戶</li>
                                <li style="display: none;" class="error-msg qualify_empty">請確認是否有購買健達繽紛樂產品2件</li>
                                <li style="display: none;" class="error-msg qualify_not_meet">請確認是否有購買健達繽紛樂產品2件</li>
                                <li style="display: none;" class="error-msg trans_receipt_number_empty">請輸入收據編號</li>
                                <li style="display: none;" class="error-msg trans_receipt_number_invalid_format">請輸入正確收據編號格式</li>
                                <li style="display: none;" class="error-msg trans_receipt_image_invalid">請上載收據圖片</li>
                                <li style="display: none;" class="error-msg player_email_empty">請輸入電郵地址</li>
                                <li style="display: none;" class="error-msg player_email_invalid_format">請輸入正確電郵格式</li>
                                <li style="display: none;" class="error-msg player_name_empty">請輸入姓名</li>
                                <li style="display: none;" class="error-msg player_name_contains_symbol">請輸入英文姓名</li>
                                <li style="display: none;" class="error-msg player_phone_empty">請輸入手提電話號碼</li>
                                <li style="display: none;" class="error-msg player_phone_invalid_format">請輸入正確手提電話號碼格式</li>
                                <li style="display: none;" class="error-msg player_phone_contains_symbol">請輸入有效手提電話號碼</li>
                                <li style="display: none;" class="error-msg not_adult">請確認你已年滿18歲/年齡介於12-18歲並已取得法律監護人家長之同意參加本活動</li>
                                <li style="display: none;" class="error-msg tnc_not_checked">請閱讀並接受條款及細則</li>
                                <li style="display: none;" class="error-msg record_duplicated_receipt">重複收據</li>
                            </ul>
                        </div>

                        <div class="row mx-auto text-center">
                            <div class="col-lg-8 col-md-8 col-sm-12 col-12"><img src="img/upload-photo-txt.png" alt="請上載收據照片(最多5MB)"></div>
                            <div class="col-lg-4 col-md-4 col-sm-12 col-12"><button name="upload-photo-btn" class="btn upload-photo-btn w-100" type="button"><img src="img/upload-photo-btn.png" alt="上載照片"></button></div>
                            <div class="trans-image-wrapper">
                                <canvas name="trans_image" class="d-lg-none d-md-none col-sm-auto col-auto mx-auto trans-image"></canvas>
                            </div>
                        </div>

                        <div class="row text-left">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-12"><img src="img/qualify-txt.png" alt="合資格產品包括："></div>
                            <div class="col-lg-12 col-md-12 col-sm-12 col-12"><img src="img/qualify-sub-txt.png" alt="三包裝只計算為一件貨品"></div>
                        </div>

                        <div class="row">
                            <div class="col-lg-8 col-md-8 col-sm-12 col-12">
                                <div class="row">
                                    <div class="col-6"><img src="img/product-kb-two.png" alt="標準2"></div>
                                    <div class="col-6"><img src="img/product-kb-three.png" alt="標準3"></div>
                                    <div class="col-6"><img src="img/product-kbw-two.png" alt="白朱古力2"></div>
                                    <div class="col-6"><img src="img/product-kbw-three.png" alt="白朱古力3"></div>
                                    <div class="col-6"><img src="img/product-kbd-two.png" alt="黑朱古力2"></div>
                                    <div class="col-6"><img src="img/product-kbd-two.png" alt="黑朱古力3"></div>
                                    <div class="col-6"><img src="img/product-kbc-two.png" alt="椰子2"></div>
                                    <div class="col-6"><img src="img/product-kbc-sixteen.png" alt="16包裝"></div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-12 col-12 trans-image-wrapper">
                                <img src="img/upload-placeholder.jpg" name="trans_image" class="d-lg-inline-block d-md-inline-block d-sm-none d-none trans-image" alt="請上載收據照片">
                            </div>
                        </div>
                        <div class="line-wrapper">
                            <img src="img/line.png" alt="Line">
                        </div>
                    </div>
                    <div class="col-auto "></div>
                </div>

                <div class="col-fields">
                    <div class="text-center">
                        <div class="d-none">
                            <input class="filename-block" type="file" id="trans_receipt_image" name="trans_receipt_image" accept="image/*"><br/>
                        </div>
                        <img class="d-lg-none d-md-none d-sm-inline-block d-inline-block" src="img/receipt-no-sample.png" alt="收據例子">
                    </div>
                    <table>
                        <tr>
                            <td><label for="trans_location"><img src="img/shop-txt.png" alt="購物商戶"></label></td>
                            <td>
                                <select id="trans_location" name="trans_location" class="trans_location">
                                    <option value="" selected="selected">請選擇</option>
                                    <option value="百佳">百佳</option>
                                    <option value="惠康">惠康</option>
                                    <option value="萬寧">萬寧</option>
                                    <option value="屈臣氏">屈臣氏</option>
                                    <option value="7-11">7-11</option>
                                    <option value="OK便利店">OK便利店</option>
                                    <option value="AEON百貨">AEON百貨</option>
                                    <option value="崇光百貨">崇光百貨</option>
                                    <option value="一田百貨">一田百貨</option>
                                    <option value="APITA">APITA</option>
                                    <option value="UNY">UNY</option>
                                    <option value="華潤萬家">華潤萬家</option>
                                    <option value="U購Select">U購Select</option>
                                </select>
                            </td>

                            <td rowspan="7" >
                                <img class="d-lg-inline-block d-md-inline-block d-sm-none d-none sample-image" src="img/receipt-no-sample.png" alt="收據例子">
                            </td>
                        </tr>

                        <tr>
                            <td><label for="trans_month"><img src="img/receipt-date-txt.png" alt="收據日期"></label></td>
                            <td><input type="text" class="date" name="trans_date" placeholder="DD/MM/YYYY" value="" data-toggle="datepicker" autocomplete="off"></td>
                        </tr>

                        <tr>
                            <td>
                                <label for="qualify">
                                    <img class="d-lg-inline-block d-md-inline-block d-sm-none d-none" src="img/buy2-txt.png" alt="有否購買健達繽紛樂產品2件"><img class="d-lg-none d-md-none d-sm-inline-block d-inline-block" src="img/buy2-txt-m.png" alt="有否購買健達繽紛樂產品2件"><br/>
                                    <img src="img/qualify-sub-txt.png" alt="3包裝只計算為1件產品">
                                </label>
                            </td>
                            <td>
                                <select id="qualify" name="qualify" class="qualify">
                                    <option value="" selected> 請選擇 </option>
                                    <option value="Y">有</option>
                                    <option value="N">沒有</option>
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td><label for="trans_receipt_number"><img src="img/receipt-no-txt.png" alt="收據編號" ></label></td>
                            <td><input type="text" class="trans_receipt_number" name="trans_receipt_number" value="" maxlength="32"></td>
                        </tr>

                        <tr>
                			<td><label for="player_name"><img src="img/name-txt.png" alt="英文全名"><br/><img src="img/name-sub-txt.png" alt="與身份證相同"></label></td>
                			<td><input type="text" class="player_name" name="player_name" value=""></td>
                        </tr>

                        <tr>
                            <td><label for="player_phone"><img src="img/phone-txt.png" alt="手提電話號碼"><br/><img src="img/for-win-txt.png" alt="用作得獎通知之用"></label></td>
                            <td><input type="text" class="player_phone" name="player_phone" value="" maxlength="8"></td>
                        </tr>

                        <tr>
            			    <td><label for="player_email"><img src="img/email-txt.png" alt="電郵地址："><br/><img src="img/email-sub-txt.png" alt="用作得獎通知之用"></label></td>
                            <td><input type="text" class="player_email" name="player_email" value=""></td>
                        </tr>

                        <tr>
                			<td></td>
                            <td class="checkboxes-cell">
                                <label class="checkbox-wrapper">
                    				<input type="checkbox" id="adult" name="adult" value="adult">
                                    <span class="checkmark"></span>
                                    本人同意接受本推廣活動<br/>
                                    <a href="javascript:;" role="modal" data-target="tnc">條款及細則</a>
                    			</label>
                                <label class="checkbox-wrapper">
                                    <input type="checkbox" id="tnc" name="tnc" value="tnc">
                                    <span class="checkmark"></span>
                                    本人已年滿18歲/年齡介乎12-18歲，並已取得法律監護人/家長之同意參加本活動。
                                </label>
                            </td>
                        </tr>
                    </table>

                </div><!--.col-field-->

                <div class="button-wrapper">
                    <div class="btn reset-btn d-md-inline-block d-sm-none d-none"><span class="text"><img src="img/again-btn.png" alt="重新輸入"></span></div>
                    <button class="btn next-btn" type="submit"><span class="text"><img src="img/submit-btn.png" alt="送出"></span></button>
                    <div class="btn reset-btn d-md-none d-sm-block d-block"><span class="text"><img src="img/again-btn.png" alt="重新輸入"></span></div>
                </div> <!-- .button-wrapper -->
	    	</form>

            <div class="declare-text-wrapper">
                <div>*哈利波特是華納兄弟娛樂公司的註冊商標。<br/>費利羅亞洲有限公司及健達繽紛樂與華納兄弟娛樂公司並無任何商業合作。</div>
            </div>

            <div class="row query-text-wrapper">
                <div class="tel col-lg-6 col-md-6 col-sm-12 text-lg-left text-md-left text-sm-center text-center">查詢電話：xxxx xxxx</div>
                <div class="license col-lg-6 col-md-6 col-sm-12 text-lg-right text-md-right text-sm-center text-center">推廣生意的競賽牌照號碼: xxxx</div>
            </div>

	    </div> <!-- .container .content -->

	    <div class="bottom-bg"></div> <!-- .bottom-bg -->

	</section> <!-- .container-fluid register page -->

</div> <!-- #scene-register -->

<?php if (DEBUG): ?>
    <script type="text/javascript">
    function __debug_fx_receipt_random() {
        var receipt = Math.round(Math.random() * 999999);
        var location = Math.round(Math.random() * 12)+1;
        var date = __debug_format_date(__debug_random_date(new Date(2020, 4 - 1, 17), new Date(2020, 5 - 1), 23));

        $('form[role="form-register"]')
        .find('[name="trans_date"]').val(date)
        .end()
        .find('[name="trans_receipt_number"]').val(
            ((receipt < 100000) ? ('0' + receipt) : receipt)
        )
        .end()
        .find('[name="qualify"]').val("Y").change()
        .end()
        .find('[name="player_email"]').val(__debug_random_letter(4) + '@' + __debug_random_letter(4) + '.COM')
        .end()
        .find('[name="player_name"]').val(__debug_random_letter(6))
        .end()
        .find('[name="player_phone"]').val(
            Math.round(Math.random() * (100000000 - 10000000) + 10000000) // int from 10000000 to 99999999
        )
        .end()
        .find('[name="trans_location"]').val($('[name="trans_location"] option').eq(location).val()).change()
        .end();
    }

    function __debug_random_letter(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var charactersLength = characters.length;
        for (var i=0; i<length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    function __debug_random_number(length) {
        var result           = '';
        var characters       = '0123456789';
        var charactersLength = characters.length;
        for (var i=0; i<length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    function __debug_random_date(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    function __debug_format_date(date) {
        var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [day, month, year].join('/');
    }

    function __debug_fx_receipt_reset() {
        $('form[role="form-register"]')
        .find('[name="trans_date"]').val('')
        .end()
        .find('[name="trans_locaiton"]').val('')
        .end()
        .find('[name="qualify"]').val('')
        .end()
        .find('[name="trans_receipt_number"]').val('')
        .end()
        .find('[name="trans_amount"]').val('')
        .end()
        .find('[name="player_email"]').val('')
        .end()
        .find('[name="player_name"]').val('')
        .end()
        .find('[name="player_phone"]').val('');
    }
    $(document).ready(function() {
        __debug_fx_receipt_random();
    });
    </script>
<?php endif; ?>