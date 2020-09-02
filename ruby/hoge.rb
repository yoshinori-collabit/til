client = HTTPClient.new do
  ssl_config.verify_mode = OpenSSL::SSL::VERIFY_NONE
  self.connect_timeout = 30
  self.send_timeout = 30
  self.receive_timeout = 30
end

account = 'xxxxxx'
min_page = 1
max_page = 100

items = []
(min_page..max_page).each do |page|
  response = client.get("https://peing.net/api/v2/items/?type=answered&account=#{account}&page=#{page}").body
  item = JSON.parse(response)['items']
  items.concat(item)

  puts "#{page} page"
  puts item
  sleep 1
end

File.open('peing.txt', mode: 'w') do |f|
  f.puts items.to_json
end

items = JSON.parse(File.open("#{account}.txt").read)

File.open("#{account}_parsed.txt", mode: 'w') do |f|
  items.each do |item|
    f.puts "--------------------------"
    f.puts item['body']
    f.puts "--------------------------"
    f.puts item['answer_body']
    f.puts "--------------------------"
    f.puts
    f.puts
    f.puts
  end
end
