import React from 'react';

type Props = {};

const News = (props: Props) => {
    return (
        <div className='container mx-auto min-h-screen space-y-6'>
            {/* Hình ảnh đầu tiên */}
            <div className='flex justify-center'>
                <img
                    src="https://bizweb.dktcdn.net/100/438/408/files/277560007-677088196933874-891735210277297805-n.jpg?v=1651638501861"
                    alt="lỗi ảnh"
                    className='w-[80%] max-w-screen-xl'
                />
            </div>

            {/* Giới thiệu về thương hiệu */}
            <p className='w-[80%] mx-auto text-center pt-5'>
                Bắt đầu từ thương hiệu thời trang Hi5 ra đời trong năm 2009, trải qua chặng đường phát triển đầy khó khăn, Hi5 được đổi tên thành Order Men vào năm 2014 với ước mơ gây dựng một thương hiệu thời trang hàng đầu thế giới.
            </p>
            <p className='w-[80%] mx-auto text-center pt-5'>
                Từ đó trở đi Order Men lớn mạnh không ngừng, đến năm 2016 Order Men đã có 38 cửa hàng, chỉ sau 2 năm vào năm 2018 Order Men đã có 73 cửa hàng. Đến năm 2019 Order Men đã có 82 cửa hàng và tính đến thời điểm hiện tại Order Men đã mở rộng được hơn 260 cửa hàng trên toàn quốc.
            </p>

            {/* Hình ảnh Sứ Mệnh */}
            <div className='flex justify-center pt-5'>
                <img
                    src="https://bizweb.dktcdn.net/100/438/408/files/su-menh-tam-nhin-yodyvn.jpg?v=1668418669422"
                    alt="lỗi ảnh"
                    className='w-[80%] max-w-screen-xl'
                />
            </div>

            {/* Sứ mệnh của Order Men */}
            <p className='w-[80%] mx-auto  pt-5 text-2xl'>SỨ MỆNH CỦA ORDER MEN</p>
            <p className='w-[80%] mx-auto  '>
                Make everyone look good, feel good
            </p>

            {/* Tầm nhìn của Order Men */}
            <p className='w-[80%] mx-auto  pt-5 text-2xl'>TẦM NHÌN CỦA ORDER MEN</p>
            <p className='w-[80%] mx-auto '>
                Everyday wear for everyone
            </p>

            {/* Niềm tin của Order Men */}
            <p className='w-[80%] mx-auto  pt-5 text-2xl'>NIỀM TIN CỦA ORDER MEN</p>
            <ul className='w-[80%] mx-auto text-left'>
                <li className='pt-1'>Tất cả các khoản chi đều là chi phí, chỉ có chi cho khách hàng và nhân viên là không phí.</li>
                <li className='pt-1'>Tất cả những thành viên của Order Men đều đang nỗ lực hết sức và có năng lực để thực hiện mục tiêu chung.</li>
                <li className='pt-1'>Mỗi thành viên Order Men đều có thể thay đổi khi được trao niềm tin, ghi nhận, hướng dẫn và đào tạo.</li>
            </ul>

            {/* Hình ảnh Niềm tin */}
            <div className='flex justify-center pt-5'>
                <img
                    src="https://bizweb.dktcdn.net/100/438/408/files/tam-nhin-su-menh-yody.jpg?v=1708662665859"
                    alt="lỗi ảnh"
                    className='w-[80%] max-w-screen-xl'
                />
            </div>

            {/* Thông tin chi tiết về Order Men */}
            <p className='w-[80%] mx-auto text-center pt-2'>
                Order Men mong muốn mang đến cho toàn bộ khách hàng trên khắp mọi miền tổ quốc Việt Nam những sản phẩm thời trang do chính tay người Việt làm ra. Không phân biệt tầng lớp, không phân biệt giàu nghèo, những khách hàng chưa bao giờ được trải nghiệm dịch vụ mua sắm vượt ngoài mong đợi, ai cũng sẽ được chào đón, tôn trọng khi đến với Order Men.
            </p>
            <p className='w-[80%] mx-auto text-center pt-2'>
                Chính vì vậy, Order Men dày công nghiên cứu chất liệu sản phẩm và cho ra mắt những dòng sản phẩm tối ưu cả về giá cả và chất lượng mang đến cho khách hàng. Cùng với đó, Order Men luôn dành phần lớn thời gian để đào tạo văn hóa phục vụ cho toàn bộ nhân viên. Mỗi nhân viên sẽ là 1 đại sứ thương hiệu, mỗi nhân viên sẽ là 1 hình mẫu về văn hóa phục vụ của Order Men và trao giá trị tốt nhất đến từng khách hàng.
            </p>

            {/* Giá trị cốt lõi */}
            <p className='w-[80%] mx-auto text-center pt-5 text-2xl'>GIÁ TRỊ CỐT LÕI CỦA ORDER MEN</p>
            <p className='w-[80%] mx-auto text-center pt-2'>
                Ở Order Men, chúng tôi luôn gìn giữ 5 Giá Trị Cốt Lõi để mọi bước đi đều thêm vững chắc và giàu giá trị.
            </p>

            {/* Các giá trị cốt lõi */}
            <div className='w-[80%] mx-auto text-left pt-5'>
                <p className='text-2xl'>1. Customer centric</p>
                <p className='pt-2 pl-5'>Đặt sự hài lòng của khách hàng là ưu tiên số 1 trong mọi suy nghĩ và hành động.</p>

                <p className='text-2xl pt-3'>2. Ownership & Autonomy</p>
                <p className='pt-2 pl-5'>Sở hữu mục tiêu công ty, đội nhóm, cá nhân.</p>
                <p className='pt-2 pl-5'>Chủ động tìm kiếm nguồn lực và giải pháp.</p>
                <p className='pt-2 pl-5'>Suy nghĩ và hành động vì lợi ích tốt nhất cho tổ chức.</p>

                <p className='text-2xl pt-3'>3. Integrity</p>
                <p className='pt-2 pl-5'>Trung thực về tiền bạc, hàng hóa, tài sản.</p>
                <p className='pt-2 pl-5'>Làm đúng, làm đủ theo thiết kế.</p>
                <p className='pt-2 pl-5'>Giữ lời hứa với khách hàng, đồng nghiệp, đối tác.</p>
                <p className='pt-2 pl-5'>
                    Khi đã nỗ lực hết sức mà thấy nguy cơ không thể giữ lời thì ngay lập tức thông tin cho những người có liên quan, tìm hiểu tác động, dọn dẹp hậu quả và đưa ra lời hứa mới.
                </p>

                <p className='text-2xl pt-3'>4. Growth mindset - Cầu tiến</p>
                <p className='pt-2 pl-5'>Không ngừng học tập và tự hoàn thiện.</p>
                <p className='pt-2 pl-5'>Sẵn sàng thử nghiệm phương pháp mới, chấp nhận thất bại và tiếp tục hành động.</p>
                <p className='pt-2 pl-5'>Luôn nhìn thấy chủ đích tích cực trong mọi tình huống.</p>

                <p className='text-2xl pt-3'>5. Good Relationship - Mối quan hệ tốt đẹp</p>
                <p className='pt-2 pl-5'>Hào phóng, sẵn sàng cho đi và giúp đỡ mọi người.</p>
                <p className='pt-2 pl-5'>Đặt mình vào vị trí người nói để lắng nghe trọn vẹn và không thành kiến.</p>
                <p className='pt-2 pl-5'>Sẵn sàng đóng góp và đón nhận sự đóng góp một cách kịp thời, trực tiếp và xây dựng.</p>
                <p className='pt-2 pl-5'>Luôn ghi nhận thành quả hoặc nỗ lực dù chưa có thành quả.</p>
            </div>
        </div>
    );
};

export default News;
